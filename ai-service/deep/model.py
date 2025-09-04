import torch.nn as nn

class RecSysModel(nn.Module):
    def __init__(self, num_users, num_items, embedding_dim=32):
        super().__init__()
        self.user_embedding = nn.Embedding(num_users, embedding_dim)
        self.item_embedding = nn.Embedding(num_items, embedding_dim)
        self.output = nn.Linear(embedding_dim * 2, 1)

    def forward(self, user_ids, item_ids):
        user_vecs = self.user_embedding(user_ids)
        item_vecs = self.item_embedding(item_ids)
        x = torch.cat([user_vecs, item_vecs], dim=1)
        return self.output(x).squeeze()
