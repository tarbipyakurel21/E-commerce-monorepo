from typing import Tuple
import pandas as pd
from sklearn.preprocessing import StandardScaler

# -----------------------------
# Step 1: Convert Interactions to Matrix
# -----------------------------

def convert_interactions_to_matrix(df: pd.DataFrame) -> pd.DataFrame:
    """
    Converts a DataFrame of interactions into a user-product matrix.
    Rows = users, Columns = products, Values = weighted interaction scores.
    """
    if 'userId' not in df.columns or 'productId' not in df.columns:
        raise ValueError("DataFrame must contain 'userId' and 'productId' columns")

    # Keep only view/click/purchase
    df = df[df['type'].isin(['view', 'click', 'purchase'])]

    # Assign interaction weights
    interaction_weights = {"view": 0.2, "click": 0.5, "purchase": 1.0}
    df['interaction'] = df['type'].map(interaction_weights).fillna(0)

    # Create the user-item matrix
    matrix = df.pivot_table(
        index='userId',
        columns='productId',
        values='interaction',
        aggfunc='sum',
        fill_value=0
    )

    return matrix

def extract_context_features(df: pd.DataFrame, 
    scaler: StandardScaler = None,
    fit_scaler: bool = False
) -> Tuple[pd.DataFrame, StandardScaler]:
    """
    Extracts one-hot encoded and scaled context features.
    If a scaler is provided, it will be used. If fit_scaler is True, scaler will be fitted.
    
    Args:
        df: DataFrame with interaction data
        scaler: Optional StandardScaler for numeric columns
        fit_scaler: If True, fits the scaler (used during training)
    
    Returns:
        context_features: A processed DataFrame
        scaler: The fitted scaler (if applicable)
    """
    # Define context columns
    context_cols = ['deviceType', 'category', 'brand', 'location', 'timeOfDay', 'weekday']
    numeric_cols = ['price']

    # Ensure all context columns exist
    for col in context_cols:
        if col not in df.columns:
            df[col] = None

    context_features = pd.get_dummies(df[context_cols], dummy_na=True)

    # Scale numeric features like price
    if all(col in df.columns for col in numeric_cols):
        numeric_data = df[numeric_cols]

        if scaler is None:
            scaler = StandardScaler()

        if fit_scaler:
            scaled_data = scaler.fit_transform(numeric_data)
        else:
            scaled_data = scaler.transform(numeric_data)

        # Add scaled numeric features
        for i, col in enumerate(numeric_cols):
            context_features[f"{col}_scaled"] = scaled_data[:, i]

    return context_features, scaler
