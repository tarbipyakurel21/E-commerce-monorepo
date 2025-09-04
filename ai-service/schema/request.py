from pydantic import BaseModel
from typing import List
from datetime import datetime

class Interaction(BaseModel):
    productId: int
    type: str
    timestamp: datetime
    deviceType: str
    category: str
    price: float
    brand: str
    location: str
    timeOfDay: str
    weekday: str

class AIRequest(BaseModel):
    userId: int
    interactions: List[Interaction]
