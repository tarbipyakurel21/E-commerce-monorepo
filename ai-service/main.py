from fastapi import FastAPI
from schema.request import AIRequest
from model.recommender import recommend_products

app = FastAPI()

@app.post("/api/recommend")
def recommend(request: AIRequest):
    product_ids = recommend_products(request.userId, request.interactions)
    return product_ids
 

 