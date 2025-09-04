import os
import pickle
import pandas as pd
import numpy as np
from scipy import sparse
from sklearn.neighbors import NearestNeighbors
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from utils.preprocess import extract_context_features,convert_interactions_to_matrix
from sklearn.metrics import average_precision_score

def load_model(path: str):
    """Load a pickle model from disk."""
    with open(path, 'rb') as f:
        return pickle.load(f)

# Utility: save as an python object(model,scalar,etc) to a file
# using pickle 
def save_pickle(obj,path:str):
    # create folder if it doesnot exist
    os.makedirs(os.path.dirname(path),exist_ok=True)

    #save objects as pickle
    with open(path,'wb') as f:
        pickle.dump(obj,f)

#Collaborative filtering training 
def train_collaborative_filtering(data_path,model_path):
    '''
    Train a collaborative filtering model using k-Nearest Neighbours (KNN)
    '''

    #Step 1: Load interaction data
    #Load all products from CSV or database
    products_df=pd.read_csv("data/all_products.csv",usecols=['productId'])
    catalog_products_ids=products_df['productId'].dropna().drop_duplicates().tolist()
    
     #save to pickle for later use
    with open("model/all_products_ids.pkl","wb") as f:
        pickle.dump(catalog_products_ids,f)


    df=pd.read_csv(data_path)
    if df.empty:
        raise ValueError("The CSV file is empty")
    
    #Step 2: Convert interactions to user-item matrix
    user_item_matrix=convert_interactions_to_matrix(df)
    if user_item_matrix.shape[0]<1 or user_item_matrix.shape[1]<1:
        raise ValueError("User-item matrix is empty or invalid")
    
    #Step 3: Merge with previous all_products list
    artifacts_dir=os.path.dirname(model_path)
    all_products_path=os.path.join(artifacts_dir,"all_products_ids.pkl")
    if os.path.exists(all_products_path):
        with open (all_products_path,"rb") as f:
            historical_products=pickle.load(f)
    else:
        historical_products=[]

    # union of catalog + historical + products from current training data
    current_products=list(user_item_matrix.columns)
    all_products=sorted(set(catalog_products_ids) |set(historical_products)|set(current_products))

    #Step 4: Reindex 
    user_item_matrix=user_item_matrix.reindex(columns=all_products,fill_value=0)

    #Step 5: Train kNN model
    nn_model=NearestNeighbors(metric='cosine',algorithm='brute')
    nn_model.fit(user_item_matrix.values)

    #Step 4: Save the trained model and artifacts
    save_pickle(nn_model,model_path) #kNN model

    #products in the training run
    current_products=list(user_item_matrix.columns)
    save_pickle(current_products,os.path.join(artifacts_dir,"products_ids.pkl")) #product IDs

    
    #Merge and deduplicate
    all_products=sorted(set(all_products) | set(current_products))
    save_pickle(all_products,all_products_path)

    #SAVE USER Index
    save_pickle(list(user_item_matrix.index),os.path.join(artifacts_dir,"user_index.pkl")) #user IDs
    
    #save the user-item-matrix as a sparse.npz for efficient storage
    sparse.save_npz(os.path.join(artifacts_dir,"user_item_matrix.npz"),
                    sparse.csr_matrix(user_item_matrix.values))
    
    print("Collaborative filtering model saved successfully!")


#Context-Based Model Training
def train_context_model(data_path,model_path):
    '''
    Train a logistic regression model to predict user click/purchase behaviour.
    Uses additional context features (deviceType, category, price, etc.)
    '''

    #Step 1: Load .csv file
    df=pd.read_csv(data_path)
    if df.empty:
        raise ValueError("The CSV file is empty")
    if "type" not in df.columns:
        raise ValueError("The 'type' column is missing!")
    
    #Step 2: Create labels for classification
    # 1 = user clicked or purchased, 0= user only viewed
    df['label']=df['type'].isin(['click','purchase']).astype(int)
    if df['label'].nunique()<2:
        raise ValueError("We need at least two classes (0 and 1) to train the model.")
    
    #Step 3: Extract features
    #Converts categorical columns to one-hot, scales numeric columns
    #like price

    X,scaler=extract_context_features(df,fit_scaler=True)

    # saving feature columns so inference can align to them
    artifacts_dir=os.path.dirname(model_path)
    save_pickle(list(X.columns),os.path.join(artifacts_dir,"context_features.pkl"))
    
    y=df['label'].values

    #Step 4: Split into train/test sets
    X_train,X_test,y_train,y_test=train_test_split(
        X,y,test_size=0.2,stratify=y,random_state=42)
    
    #Step 5: Train logistic regression classifier
    model=LogisticRegression(C=0.1,max_iter=500,solver="lbfgs",class_weight="balanced")
    model.fit(X_train,y_train)

    #Step 6: Evaluate model using AUC(optional)
    try:
        auc=roc_auc_score(y_test,model.predict_proba(X_test)[:,1])
        ap=average_precision_score(y_test,model.predict_proba(X_test)[:,1])
        print("PR-AUC:",ap)
        print(f"Context model validation AUC: {auc:.3f}")
    except Exception:
        print("Couldn't calculate AUC.")

    #Step 7: Save the trained model and scaler
    artifacts_dir=os.path.dirname(model_path)
    #logistic regression model
    save_pickle(model,model_path)
    #scaler for numeric features
    save_pickle(scaler,os.path.join(artifacts_dir,"price_scaler.pkl"))

    print("Context model saved successfully!")
