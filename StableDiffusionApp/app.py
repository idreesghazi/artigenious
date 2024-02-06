from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO
from authtoken import auth_token
from diffusers import StableDiffusionPipeline
from torch import autocast
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

modelid = "CompVis/stable-diffusion-v1-4"
device = "cuda"
pipe = StableDiffusionPipeline.from_pretrained(modelid, revision="fp16", torch_dtype=torch.float16, use_auth_token=auth_token)
pipe.to(device)

@app.route('/generate', methods=['POST'])
def generate():
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
        return jsonify(success=True, image=img_io.read().decode('latin1'))
    except Exception as e:
        return jsonify(success=False, error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
