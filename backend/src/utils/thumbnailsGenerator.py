from PIL import Image

def create_thumbnail(img_path):
      image = Image.open(img_path)
      image.thumbnail((90,90))
      image.save('./backend/data/imagesThumbs/2015/Croatia/mini.jpg')
    #   image1 = Image.open('images/thumbnail.jpg')
    #   image1.show()

create_thumbnail("./backend/data/images/2015/Croatia/lmao.jpg")