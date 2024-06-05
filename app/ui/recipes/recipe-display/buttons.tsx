'use client'

import { addRecipeToSchedule, deleteRecipe } from "@/app/lib/actions";
import { exportRecipe } from "@/app/lib/api";
import { Recipe } from "@/app/lib/definitions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface ConfirmDeleteDialogProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

export function ScheduleRecipe({ id, recipe }: { id: string, recipe: Recipe }) {
  const [schedule,setSchedule] = useState(recipe.todo_list)
  const scheduleThisRecipe = addRecipeToSchedule.bind(null, id);
  // const handleScheduling() {

  
  if (!recipe.todo_list) {

  return  (
    <form action={scheduleThisRecipe}>
      <button className="flex h-10 items-center border-2 border-slate-200 px-4 text-sm font-medium text-black transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
      >
        <span className="hidden md:block">Schedule Recipe</span>{' '}
        </button>
        </form>
    );
  } else {
    return  (
        <form action={scheduleThisRecipe}>
          <button className="flex h-10 items-center border-2 border-slate-200 px-4 text-sm font-medium text-black transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
          >
            <span className="hidden md:block">Unschedule Recipe</span>{' '}
            </button>
            </form>
        );
        
  }
  }

  export function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef<HTMLElement>(null);
    const deleteRecipeWithId = deleteRecipe.bind(null, props.value);

    useEffect(() => {
      if (!open) {
        setValue(valueProp);
      }
    }, [valueProp, open]);
  
    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };
  
    const handleCancel = () => {
      onClose();
    };
  
    const handleOk = () => {
      deleteRecipeWithId()

    };

  
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}
      >
        <DialogTitle>Delete This Recipe?</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  }
  

  export  function DeleteRecipe({ id }: { id: string }) {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(id);

    const handleClickListItem = () => {
      setOpen(true);
    };
  
    const handleClose = (newValue?: string) => {
      setOpen(false);
    }

    return (
      <div>
        <button onClick={handleClickListItem} className="flex h-10 items-center rounded-r-lg border-2 border-red-200 px-4 text-sm font-medium text-red transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 " />
        </button>
        <ConfirmDeleteDialog
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
        </div>
    );
  }

  export  function ExportRecipe({ id }: { id: string }) {
    const exportRecipeWithId = exportRecipe.bind(null, id);
    return (
      <form action={exportRecipeWithId}>
        <button className="flex h-10 items-center  px-4 text-sm font-medium border-2 border-slate-200 rounded-l-lg text-black transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
          <span className=" md:block">Send as Email</span>
        </button>
      </form>
    );
  }