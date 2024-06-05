'use client'

import { removeAllScheduledRecipes, removeAllShoppingListItems } from "@/app/lib/actions";
import { exportShoppingList } from "@/app/lib/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface ConfirmDeleteDialogProps {
    id: string;
    keepMounted: boolean;
    value: string;
    open: boolean;
    onClose: (value?: string) => void;
  }

export function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef<HTMLElement>(null);

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
  
    const handleOkShopping = () => {
        removeAllShoppingListItems()
        onClose()
    };

    const handleOkSchedule = () => {
        removeAllScheduledRecipes()
        onClose()
    };

    

  
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}
      >
        {value=="shopping" ? <><DialogTitle>Reset Shopping List?</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOkShopping}>Yes</Button>
        </DialogActions></> : 
        <><DialogTitle>Reset Sheduled Recipes?</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOkSchedule}>Yes</Button>
        </DialogActions></>}
      </Dialog>
    );
  }

export function DeleteTables({tabletype}: {tabletype : string}) {

    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(tabletype)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    const handleClickListItem = () => {
      setOpen(true);
    };
  
    const handleClose = (newValue?: string) => {
      setOpen(false);
    }

    return (
      <div>
        {value=="shopping" ? 
        <button onClick={handleClickListItem} className="flex h-10 items-center rounded-r-lg border-2 border-red-200 px-4 text-sm font-medium text-red transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 " />
        </button> : <button onClick={handleClickListItem} className="flex h-10 items-center rounded-lg border-2 border-red-200 px-4 text-sm font-medium text-red transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 " />
        </button>}
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

  export  function ExportShoppingList() {
    return (
      <form action={exportShoppingList}>
        <button className="flex h-10 items-center  px-4 text-sm font-medium border-2 border-slate-200 rounded-l-lg text-black transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
          <span className=" md:block">Send as Email</span>
        </button>
      </form>
    );
  }
