from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
from pathlib import Path
import sys
import json


from custom_bing_image_downloader import downloader

# OUTPUT_DIR = "../web/images"
OUTPUT_DIR = "../ais-ui/public/images"

app = FastAPI()

origins = [
    # "http://localhost",
    # "http://localhost:8080",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageDownloadRequest(BaseModel):
    query: str
    limit: int = 10
    output_dir: str = OUTPUT_DIR
    adult_filter_off: bool = True
    timeout: int = 5


@app.post("/download_images/")
async def download_images(request: ImageDownloadRequest):
    response = download(
        request.query,
        limit=request.limit,
        output_dir=request.output_dir,
        adult_filter_off=request.adult_filter_off,
        timeout=request.timeout,
    )
    return response


def download(
    query,
    limit=10,
    output_dir=OUTPUT_DIR,
    adult_filter_off=True,
    force_replace=False,
    timeout=60,
    filter="",
    verbose=True,
):
    
    image_dir = Path(output_dir).joinpath(query).absolute()
    if Path.is_dir(image_dir):
        # load urls.json from image_dir
        urls_file = image_dir.joinpath("urls.json")
        with open(urls_file, "r") as f:
            image_urls = f.read()
            return json.loads(image_urls)
    
    image_urls = downloader.download(
        query,
        limit=limit,
        output_dir=output_dir,
        adult_filter_off=adult_filter_off,
        force_replace=force_replace,
        timeout=timeout,
        filter=filter,
        verbose=verbose,
    )

    return image_urls


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
