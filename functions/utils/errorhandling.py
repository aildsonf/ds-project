from typing import Dict
from fastapi import HTTPException

def send_error(error: int, message: str, extra_header: Dict[str, any]=None):
    raise HTTPException(status_code=error, detail=message, headers=extra_header)