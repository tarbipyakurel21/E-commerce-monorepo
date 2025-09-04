import pickle
import pandas as pd
from model.training import load_model
from utils.preprocess import convert_interactions_to_matrix,extract_context_features
import numpy as np

# load trained models and artifacts
collab_model = load_model("model/model.pkl")
context_model=load_model("model/context_model.pkl")

with open("model/all_products_ids.pkl","rb") as f:
    product_columns=pickle.load(f)

with open("model/price_scaler.pkl","rb") as f:
    scaler=pickle.load(f)

with open("model/context_features.pkl", "rb") as f:
    context_feature_cols = pickle.load(f)

#load full product metadata(needed for context features)
all_products_df=pd.read_csv("data/all_products.csv")

def recommend_products(user_id,interactions,top_n=5):

    '''
    Hybrid recommendation system using collaborative filtering and context-based ML model
    (Logistic Regression)

    Args:
    user_id(int): Target user's ID
    interactions(list[dict]): Target user's product interaction list
    top_n(int):number of recommendations to return

    returns:
    list[int]: Top N recommended product IDs
    '''

    # convert input to dataframe
    df=pd.DataFrame([i.dict() for i in interactions])
    df['userId']=user_id

    #user vector for Collaborative Filtering
    user_item_matrix=convert_interactions_to_matrix(df)

    if user_id in user_item_matrix.index:
        user_vector_raw=user_item_matrix.loc[user_id]
        user_vector=user_vector_raw.reindex(product_columns,fill_value=0).values.reshape(1,-1)
    
    else:
        user_vector=np.zeros((1,len(product_columns)),dtype=float)

    #collaborative filtering
    collab_scores={}

    if hasattr(collab_model,'n_sample_fit_') and collab_model.n_samples_fit_ >=2:
        k=min(3,collab_model.n_sample_fit_)
        distances,neighbour_idxs=collab_model.kneighbors(user_vector,n_neighbors=k)
        neighbour_idxs=neighbour_idxs[0].astype(int)

        #aggregate scores from neighbors
        for idx,dist in zip(neighbour_idxs,distances[0]):
            neighbour_vector=collab_model._fit_X[idx]
            for product_id,score in zip(product_columns,neighbour_vector):
                collab_scores[product_id]=collab_scores.get(product_id,0)+score /(1+dist)

    #Context model
    context_scores={}
   
    if hasattr(context_model,'predict_proba') and not df.empty:
        #use the most recent interaction as current context
        latest_ctx=df.iloc[-1].to_dict()

        #Build candidate set: all products with user context
        candidates=all_products_df.copy()
        for col in ["deviceType","location","timeOfDay","weekday"]:
            candidates[col]=latest_ctx.get(col,None)
        
        #Extract features
        context_df,_=extract_context_features(candidates,scaler,fit_scaler=False)
        context_df=context_df.reindex(columns=context_feature_cols,fill_value=0)

        #probability of like for all products
        proba=context_model.predict_proba(context_df)[:,1]
        for pid, score in zip(candidates["productId"],proba):
            context_scores[pid]=score

    #combine scores from both methods
    combined_scores={}
    for pid in set(collab_scores) | set(context_scores):
        combined_scores[pid]=collab_scores.get(pid,0)+context_scores.get(pid,0)

    #get the ids of products the user has already interacted with
    seen_products=set(df['productId'].values)
    for pid in seen_products:
        if pid in combined_scores:
            del combined_scores[pid]
            

    #sort by score(descending) and return top N product IDs
    recommended_products=sorted(combined_scores.items(),key=lambda x:x[1],reverse=True)
    return[int(pid) for pid,_ in recommended_products[:top_n]]
        

