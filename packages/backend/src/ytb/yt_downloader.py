from pytubefix import YouTube
from pytubefix.cli import on_progress

url = "https://www.youtube.com/watch?v=pI4tDxRElWI"

video = YouTube(
    proxies={"http": "http://127.0.0.1:8881",
             "https": "http://127.0.0.1:8881"},
    url=url,
    on_progress_callback=on_progress,
)

# print('Title:', yt.title)

stream = video.streams.get_highest_resolution()
stream.download()