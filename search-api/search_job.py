from custom_bing_image_downloader import downloader

OUTPUT_DIR = '../web/images'

query_string = "Traditional Afghan dishes"
downloader.download(query_string, limit=10,  output_dir=OUTPUT_DIR, adult_filter_off=True, force_replace=False, timeout=60, verbose=False)
