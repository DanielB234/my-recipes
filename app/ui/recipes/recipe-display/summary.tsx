'use client'

import { Recipe } from "@/app/lib/definitions";
import Image from 'next/image';
import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { updateRecipe, uploadFile } from '@/app/lib/actions';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from "@heroicons/react/24/solid";
import ReactCrop, { PercentCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function RecipeSummary({ recipe }: { recipe: Recipe }) {
  const [editing, setEditing] = useState(false);
  const updateRecipeWithId = updateRecipe.bind(null, recipe.id);
  const [selectedImage, setSelectedImage] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  // this ref is passed to the image inside the crop modal
  const cropRef = useRef(null);
  const [crop, setCrop] = useState<any>();
  const [open, setOpen] = useState(false);

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    // trigger loading state to show the spinner
    if (e.target.files != null) {
      setIsUploadingFile(true);

      // get our file and save it to state as "originalImage"
      const file = e.target.files[0];
      // setOriginalImage(file);
      // now that we got the image, we can display its preview! 
      const preview = URL.createObjectURL(file);
      console.log(preview)
      setSelectedImage(preview);
      // and finally, trigger the image crop modal!
      setOpen(true);
    }
  }

  const handleClose = () => {
    console.log(crop)
    setOpen(false)
    setIsUploadingFile(false)
    setSelectedImage("")
  };

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    updateRecipeWithId(new FormData(e.target)).then(
      resp => setEditing(false))
  }

  const hiddenFileInput = useRef<any>(null);

  const handleUploadButtonClick = (e: any) => {
    hiddenFileInput.current!.value = null;
    hiddenFileInput.current!.click();
  }

  return (
    <form onSubmit={onHandleSubmit} className="grid  w-full grid-cols-3 gap-6">
      {editing ? (
        <> <div className="grid min-w-0 col-span-1 ">

          <div className="">
            <input
              ref={hiddenFileInput}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              name="cover"
              className={`flex hidden justify-center  `}
              // Event handler to capture file selection and update the state
              onChange={(e) => selectFile(e)}
            />
            <button
              type="button"
              className="h-full border-2 border-slate-200 w-full hover:bg-slate-100 rounded-l-lg"
              onClick={handleUploadButtonClick}>

              {!isUploadingFile && !selectedImage && (
                <span>Upload an Image</span>
              )}
              {!isUploadingFile && selectedImage && (
                <Image src={selectedImage} alt="Your uploaded image" />
              )}
            </button>
            <CropImageDialog
              id="ringtone-menu"
              keepMounted
              open={open}
              name={recipe.name}
              recipe_id={recipe.id}
              image_url={recipe.image_url}
              onClose={handleClose}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              cropRef={cropRef}
              setCrop={setCrop}
              crop={crop}
            />
          </div>
        </div>
          <div className="flex min-w-0 px-4 col-span-2  border-slate-200 border-2 rounded-r-lg px-5 py-3
           justify-between">
            <div className="w-full">
              <div className=" flex w-full justify-between relative mt-2 rounder-md">
                <input
                  defaultValue={recipe.name}
                  id="name"
                  name="name"
                  type="string"
                  className=" hidden text-sm w-full px-1 hover:bg-slate-100 rounded-lg border-slate-200 border-2 text-black sm:block md:text-3xl">
                </input>

              </div>
              <div className="flex">
                <div className=" flex w-[50%] justify-between relative mt-3 rounder-md">
                  <p className="hidden w-[38%] text-sm text-black sm:block py-1 md:text-xl">
                    Prep Time:
                  </p>
                  <input
                    defaultValue={recipe.preparation_time}
                    id="preparation_time"
                    name="preparation_time"
                    type="string"
                    className="hidden w-[62%] text-sm px-1 hover:bg-slate-100 border-slate-100 border-2 text-black sm:block md:text-xl">
                  </input>
                </div>
                <div className="flex w-[50%] pl-2 justify-between relative mt-3 rounder-md">
                  <p className="hidden w-[38%] text-sm text-black sm:block py-1 md:text-xl">
                    Cook Time:
                  </p>
                  <input
                    defaultValue={recipe.cook_time}
                    id="cook_time"
                    name="cook_time"
                    type="string"
                    className="hidden w-[62%] text-sm px-1 hover:bg-slate-100 border-slate-100 border-2 text-black sm:block md:text-xl">
                  </input>
                </div>
              </div>
              <div className="flex w-[50%] mb-10  justify-between relative mt-2 rounder-md">
                <p className="hidden w-[50%] text-sm text-black sm:block py-1 md:text-xl">
                  {recipe.serving}:
                </p>
                <input
                  id="serving_amount"
                  name="serving_amount"
                  type="number"
                  step="0.01"
                  defaultValue={parseInt(recipe.serving_amount) * recipe.modifier}
                  className="hidden text-sm px-1 w-15 hover:bg-slate-100 border-slate-100 border-2 text-black sm:block md:text-xl" />
                <p className="hidden text-sm text-black sm:block py-1 md:text-xl">
                  {recipe.serving_units}
                </p>

              </div>

            </div>
            <div className="flex w-[20%] justify between">
              <button type="submit" className="flex h-10  items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                <span className=" sr-only">Save</span>
                <CheckIcon className=" w-8 text-black" />
              </button>
              <button onClick={() => setEditing(false)} className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                <span className=" sr-only">Save</span>
                <XMarkIcon className="ml-1 w-8 text-black" />
              </button>
            </div>
          </div>

        </>) : (<>
          <div className="grid col-span-1">{recipe.image_url ? <Image
            src={recipe.image_url}
            alt={`${recipe.name}' image`}
            width={380}
            height={380}
            className="rounded-l-lg "
          /> : null}</div>
          <div className="flex min-w-0 cursor-pointer px-5 col-span-2 hover:bg-slate-100 border-slate-200 border-2 rounded-r-lg px-5 py-3 justify-between" onClick={() => setEditing(true)}>
            <div className="w-[80%]">
              <div className=" flex ml-1 w-full justify-between relative mt-2 rounder-md">
                <p className=" text-sm w-full md:text-3xl">
                  {recipe.name}
                </p>
              </div>
              <div className="flex w-full">
                <div className="flex w-[49%] justify-between relative mt-2 rounder-md">
                  <p className="hidden  w-[38%] text-sm text-black sm:block pt-3 md:text-xl">
                    Prep Time:
                  </p>
                  <p className="hidden w-[62%] text-sm text-black sm:block pt-3 md:text-xl">
                    {recipe.preparation_time}
                  </p>
                </div>
                <div className="flex w-[2%]"></div>
                <div className="flex w-[49%]  justify-between relative mt-2 rounder-md">
                  <p className="hidden w-[38%] text-sm text-black sm:block pt-3 md:text-xl">
                    Cook Time:
                  </p>
                  <p className="hidden w-[62%] text-sm text-black sm:block pt-3 md:text-xl">
                    {recipe.cook_time}
                  </p>
                </div>
              </div>
              <p className="hidden text-sm text-black sm:block pt-4 md:text-xl" >
                {recipe.serving}: {parseInt(recipe.serving_amount) * recipe.modifier} {recipe.serving_units}
              </p>
            </div>

            <div className="py-2">
              <PencilIcon className="w-5 text-gray" />
            </div>
          </div>
        </>
      )}
    </form>
  )

}

export interface CropImageDialogProps {
  id: string;
  keepMounted: boolean;
  selectedImage: string;
  name: string
  recipe_id: string;
  image_url: string;
  open: boolean;
  onClose: (value?: string) => void;
  cropRef: any;
  setCrop: (value?: PercentCrop) => void;
  setSelectedImage: any;
  crop: any;
}

export function CropImageDialog(props: CropImageDialogProps) {
  const { onClose, setSelectedImage, image_url: image_url, recipe_id: recipe_id, selectedImage: selectedImage, name: name, cropRef: cropRef, crop: crop, setCrop, open, ...other } = props;
  const radioGroupRef = useRef<HTMLElement>(null);
  const [cropResult, setCropResult] = useState<any>();
  const aspectRatio = 16 / 9;
  useEffect(() => {
    // once we saved our crop, we now need to process this new image size
    if (cropRef.current && crop.width && crop.height) {
      getCroppedImg();
    }
  }, [crop, cropRef])

  const getCroppedImg = () => {
    const image = cropRef.current;
    const cropWidth = image.naturalWidth * (crop.width / 100)
    const cropHeight = image.naturalHeight * (crop.height / 100)
    const startX = image.naturalWidth * (crop.x / 100)
    const startY = image.naturalHeight * (crop.y / 100)
    console.log(crop)
    const canvas = document.createElement('canvas')
    canvas.width = cropWidth
    canvas.height = cropHeight
    const ctx = canvas.getContext('2d')

    ctx!.drawImage(
      image,
      startX,
      startY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    )


    const reader = new FileReader()
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob!)
      reader.onloadend = () => {
        dataURLtoFile(reader.result, name)
      }
    }, 'image/png', 1)
  }


  const dataURLtoFile = (dataurl: string | ArrayBuffer | null, filename: string) => {
    if (typeof dataurl === 'string') {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let croppedImage = new File([u8arr], filename, { type: mime });
      setCropResult(croppedImage);
    
    }
  }


  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 100,
        },
        aspectRatio,
        width,
        height
      ),
      width,
      height
    )

    setCrop(crop)
  }
  const handleOk = () => {
    const formData = new FormData();
    formData.append('file', cropResult!);
    formData.append('id', recipe_id)
    formData.append('image_url', image_url)
    uploadFile(formData)
    // setSelectedImage(cropResult)
    onClose()
  };


  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 635 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}>
      <DialogTitle>Crop the image</DialogTitle>
      <DialogContent className="flex">

        <ReactCrop
          crop={crop}
          onChange={(c, percentCrop) => setCrop(percentCrop)}
          aspect={aspectRatio}
          style={{ width: 300 }}
        >
          {selectedImage ? <Image
            src={selectedImage}
            ref={cropRef}
            onLoad={onImageLoad}
            width={300}
            height={300}
            alt="Your uploaded image"
          /> : null}
        </ReactCrop>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>
          {/* <button onClick={uploadToS3}> */}
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

