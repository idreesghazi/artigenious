from ultralytics import YOLO
import cv2

model_path = 'D:/Comsats/My FYP/ArtiGenious NFT/artigenious-nft/BackEnd/YOLOv8/train/detect/train2/weights/best.pt'

image_path = 'D:/Comsats/My FYP/ArtiGenious NFT/artigenious-nft/BackEnd/YOLOv8/mydata/data/finaldata/images/train/anime12.jpg'

img = cv2.imread(image_path)
image_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

H, W, _ = img.shape

model = YOLO(model_path)
results = model(img)

detected_boxes = []
for result in results:
    boxes = result.boxes  # Boxes object for bounding box outputs
    for box in boxes:
        detected_boxes.append(box.xyxy)
        class_id = box.cls

    print("detected_boxes", boxes)
    masks = result.masks  # Masks object for segmentation masks outputs
    keypoints = result.keypoints  # Keypoints object for pose outputs
    probs = result.probs  # Probs object for classification outputs
    obb = result.obb  # Oriented boxes object for OBB outputs
    result.show()  # display to screen
    result.save(filename='result.jpg')  # save to disk





import torch

DEVICE = torch.device("cuda")
print(DEVICE)

import supervision as sv

MODEL_TYPE = "vit_h"
CHECKPOINT_PATH = 'D:/Comsats/My FYP/ArtiGenious NFT/artigenious-nft/BackEnd/SegmentAnything/GroundingDINO/modelCheckpoint/sam_vit_h_4b8939.pth'

from segment_anything import sam_model_registry, SamPredictor

sam = sam_model_registry[MODEL_TYPE](checkpoint=CHECKPOINT_PATH).to(device=DEVICE)

mask_predictor = SamPredictor(sam)


import numpy as np
mask_annotator =  sv.BoundingBoxAnnotator(color=sv.Color.blue())
segmented_mask = []
counter = 0

for mybox in detected_boxes:
    mybox = mybox.cpu().numpy().astype(int)
    print(mybox)


    mask_predictor.set_image(image_rgb)
    masks, scores, logits = mask_predictor.predict(
        point_coords=None,
        point_labels=None,
        box=mybox,
        multimask_output=False
    )

    segmented_mask.append(masks)
    print(len(masks), masks.shape)

# plot mask on image using supervision
    detections = sv.Detections(
        xyxy=sv.mask_to_xyxy(masks=masks),
        mask=masks,
        class_id= class_id.cpu().numpy().astype(int),
    )

    detections = detections[detections.area == np.max(detections.area)]

    box_annotator = sv.BoundingBoxAnnotator()
    annotated_image = box_annotator.annotate(scene=img.copy(), detections=detections)
    annotated_image = mask_annotator.annotate(scene=annotated_image.copy(), detections=detections)
    image_original = annotated_image

    counter+=1

sv.plot_images_grid(
    images=[img, annotated_image],
    grid_size=(1,2),
    titles=['Original Image', 'Mask Image']

)

print(len(segmented_mask), type(segmented_mask[0]), segmented_mask[0].shape)

for i in range(len(segmented_mask)):

  segmented_mask[i] = segmented_mask[i].transpose(1,2,0)
  segmented_mask[i] = np.array(segmented_mask[i]*255).astype('uint8')
  segmented_mask[i]  = cv2.cvtColor(segmented_mask[i] , cv2.COLOR_GRAY2BGR)


print(segmented_mask[0].shape)


# sv.plot_images_grid(
#     images=segmented_mask,
#     grid_size=(1, len(segmented_mask)),

# )


segmented_image = segmented_mask[0]

for i in range(len(segmented_mask)):
  try:
    segmented_image = cv2.bitwise_or(segmented_image, segmented_mask[i+1])
  except:
    pass

sv.plot_image(segmented_image)


segmented_image = cv2.bitwise_and(segmented_image, img)
sv.plot_image(segmented_image)

segmented_image[np.where((segmented_image == [0, 0, 0]).all(axis=2))] = [255, 255, 255]
sv.plot_image(segmented_image)


sv.plot_images_grid(
    images=[img, annotated_image, segmented_image],
    grid_size=(1, 3),
    titles=['Original Image', 'Annotated Image', 'Segmented Image'],
    #size=(48,48)

)
