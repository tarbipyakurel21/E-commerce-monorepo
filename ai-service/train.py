# train.py
#This script runs the full training pipeline
#Step 1: Trains the collaborative filtering (kNN) model
#Step 2: Trains the context-based logistice regression model

from model.training import train_collaborative_filtering, train_context_model
import pickle
import pandas as pd
#Paths to input data and where to save the trained models

# CSV with user-product interactions
DATA_PATH = "data/interactions.csv" 
# path to saved collaborative filtering model
COLLAB_MODEL_PATH = "model/model.pkl"
# path to save context-based model
CONTEXT_MODEL_PATH = "model/context_model.pkl"


if __name__ == "__main__":
    print("📊 Starting training pipeline...")

    # Train collaborative filtering model 
    # This will create:
    # -kNN model
    # -user_index.pkl
    # -products_ids.pkl
    # -user_item_matrix.npz
    train_collaborative_filtering(DATA_PATH, COLLAB_MODEL_PATH)

    # Train context-based logistic regression model
    # This will create:
    # -context_model.pkl
    # -price_scaler.pkl
    train_context_model(DATA_PATH, CONTEXT_MODEL_PATH)
    
    print("✅ All models trained and saved successfully.")
