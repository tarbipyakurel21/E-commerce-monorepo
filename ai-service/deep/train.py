import torch
from torch.utils.data import DataLoader, Dataset
import pandas as pd
from deep.model import RecSysModel
import torch.nn.functional as F
import torch.optim as optim

class InteractionDataset(Dataset):
    def __init__(self, df):
        self.user = torch.tensor(df['userId'].values, dtype=torch.long)
        self.item = torch.tensor(df['productId'].values, dtype=torch.long)
        self.label = torch.tensor(df['label'].values, dtype=torch.float32)

    def __len__(self):
        return len(self.user)

    def __getitem__(self, idx):
        return self.user[idx], self.item[idx], self.label[idx]

def train_deep_model(csv_path, model_path, num_users, num_items, epochs=5):
    df = pd.read_csv(csv_path)
    df['label'] = df['type'].apply(lambda x: 1 if x in ['click', 'purchase'] else 0)

    dataset = InteractionDataset(df)
    loader = DataLoader(dataset, batch_size=64, shuffle=True)

    model = RecSysModel(num_users, num_items)
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    for epoch in range(epochs):
        total_loss = 0
        for user_ids, item_ids, labels in loader:
            preds = model(user_ids, item_ids)
            loss = F.binary_cross_entropy_with_logits(preds, labels)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {epoch+1} Loss: {total_loss:.4f}")

    torch.save(model.state_dict(), model_path)
    print("✅ Deep model saved.")

