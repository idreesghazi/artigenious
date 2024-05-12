from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO
from authtoken import auth_token
from diffusers import StableDiffusionPipeline
from torch import autocast
import torch
import os
import random
import string
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


modelid2 = "idreesghazi/stable-diffusion-compvis-trained-on-anime-dataset"

modelid = "CompVis/stable-diffusion-v1-4"

device = "cuda"

pipe = StableDiffusionPipeline.from_pretrained(modelid, revision="fp16", torch_dtype=torch.float16, use_auth_token=auth_token)

pipe.to(device)


@app.route('/generate', methods=['POST'])
def generate():
    print("Using idreesghazi/stable-diffusion-compvis-trained-on-anime-dataset")
    print("Request received")                                                                                       
    try:
        data = request.get_json()
        prompt_text = data['prompt']
        print(f"Prompt: {prompt_text}")

        image = pipe(prompt_text).images[0]
        #with autocast(device):
        #    image = pipe(prompt_text, guidance_scale=8.5)["sample"][0]

        # Save the image to a BytesIO object



        try:
            print("Saving image")
            img_io = BytesIO()
            image.save(img_io, 'PNG')
            img_io.seek(0)
        except Exception as e:
            print(f"Error saving image: {e}")
    # Handle the error appropriately

        print("Image generated")


        
        # Generate a random filename
        letters = string.ascii_lowercase
        # filename = ''.join(random.choice(letters) for i in range(10)) + ".jpg"
        filename = "generated_image.jpg"
         # Get the current directory
        current_directory = os.getcwd()

        # Construct the file path
        file_path = os.path.join(current_directory, filename)

        # Save the image with the random filename
        with open(file_path, "wb") as file:
            file.write(img_io.getvalue())

        print("Image saved as:", filename)


        return jsonify(success=True, image=img_io.read().decode('latin1'))
    except Exception as e:
        return jsonify(success=False, error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
