'use client'

import { deleteInstructionSet, updateInstructionSet } from "@/app/lib/actions";
import { InstructionsHeader, InstructionsTable, State } from "@/app/lib/definitions";
import { DragEvent, useEffect, useRef, useState } from "react";
import { getInstructionSet } from "@/app/lib/utils";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function Instructions({ 
        names, 
        recipe_id 
    }: { 
        names: InstructionsHeader[], 
        recipe_id: string 
    }) {
    const [adding, setAdding] = useState(false)
    const [newInstructionSet, setNewInstructionSet] = useState<InstructionsHeader>(null);
    let instructionSets = names
    // setInstructionSets(names)
    const addNewInstructionSet = () => {
        // console.log(instructionSets)
        const newInstructionSet = {
            recipe_id: recipe_id,
            name: "",
            list_reference: '0',
            instructions_table: [] as InstructionsTable[]
        };
        instructionSets.push(newInstructionSet)
        setNewInstructionSet(newInstructionSet)
        setAdding(false);


    };


    return (
        <div className="flex w-full col-span-2">
            <div className="flex w-full grid grid-rows-1 gap-6 h-min">
                <p className="truncate  py-2 md:text-4x1">
                    Instructions:
                </p>
                {instructionSets?.map((instructionSet) => (
                    <InstructionsBySection name={instructionSet} instructions={instructionSet.instructions_table} recipe_id={recipe_id}  instructionSets={instructionSets}/>
                ))}

                {adding ?
                    <div className="pl-8 border-slate-200 border-2 rounded-r-lg">
                    </div> :
                    <div className="pl-8 border-slate-200 ">
                        <div className="flex w-8 h-8 bg-slate-100 hover:bg-slate-200 cursor-pointer" >
                            <PlusIcon onClick={() => addNewInstructionSet()} className="mx-1 w-8 h-8 text-black  cursor-pointer" />
                        </div>
                    </div>}
            </div>
        </div>
    )

}
export function InstructionsBySection({ 
        name, 
        instructions, 
        recipe_id,
        // setInstructionSets,
        instructionSets
    }: { 
        name: InstructionsHeader, 
        instructions: InstructionsTable[], 
        recipe_id: string,
        // setInstructionSets: any;
        instructionSets: InstructionsHeader[]
    }) {
    const [editing, setEditing] = useState(false);
    const [instructionSetName, setInstructionSetName] = useState(name.name)
    const [newDraggingItem, setDraggingItem] = useState<State["draggingItem"]>(undefined);
    // const [instructionSet, setInstructionSet] = useState<InstructionsTable[]>(instructions);
    let instructionSet = instructions
    const [newContext, setNewContext] = useState("")
    const [adding, setAdding] = useState(false);
    const updateInstructionSetWithId = updateInstructionSet.bind(null);
    const wrapperRef = useRef<HTMLTextAreaElement>(null);
    const [open, setOpen] = useState(false);

    const handleExit = () => {
        console.log(instructions)
        console.log(instructionSet)
        instructionSet = instructions.sort(({position:a},{position:b})=>a-b)
        console.log(instructionSet)
        setEditing(false)
        
    }

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setNewContext(val);
    };

    const handleDragStart = (e: DragEvent<HTMLDivElement>, item: InstructionsTable) => {
        setDraggingItem(item);
        // console.log(item)
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragEnd = () => {
        setDraggingItem(undefined);
    };

    const handleDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, targetItem: InstructionsTable) => {
        const items = instructionSet;
        const draggingItem = newDraggingItem;
        // console.log(draggingItem)
        if (!draggingItem) return;

        const currentIndex = items.indexOf(draggingItem);
        const targetIndex = items.indexOf(targetItem);

        if (currentIndex !== -1 && targetIndex !== -1) {
            items.splice(currentIndex, 1);
            items.splice(targetIndex, 0, draggingItem);
            instructionSet = items
            console.log(instructionSet)
            // setInstructionSet(items)
        }
        // console.log(instructionSet)
    };

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEditing(false);
        setOpen(false);
    }

    const handleDelete = () => {
        setEditing(false);
        setOpen(false);
        const deleteInstructionSet = instructionSets.filter(function( obj) {
            return obj.list_reference !== name.list_reference;
        })
        console.log(deleteInstructionSet)
        instructionSets = deleteInstructionSet
    }

    const addNewItem = () => {
        const separateLines = newContext.split(/\r?\n|\r|\n/g);
        separateLines.forEach(element => {
            const newInstruction = {
                id: '0',
                context: element,
                position: 0,
                list_reference: name.list_reference,
                recipe_id: recipe_id
            };
            // console.log(instructionSet)
            // if (instructionSet.length==0) {
            instructionSet.push(newInstruction)
                // setInstructionSet(instructionSet => [newInstruction])
            // } else {
            // setInstructionSet(instructionSet => [...instructionSet, newInstruction])
            // }
            setAdding(false);
        })
    };

    const onHandleSubmit = (e) => {
        const [deleteSets, updateSets, createSets, new_name, new_list_reference] = getInstructionSet(recipe_id, name.list_reference, new FormData(e.target))
        console.log(instructionSet)
        e.preventDefault();
        updateInstructionSetWithId(recipe_id, new_name, new_list_reference, deleteSets, updateSets, createSets, name.list_reference==='0').then(res => setEditing(false))
        // .then(resp => setInstructionSet(updateSets.concat(createSets))).then(res => setInstructionSetName(new_name))
            
        
    }

    return (
        <div className="pl-8 border-slate-200 border-2 rounded-r-lg">
            {editing ?
                <form onSubmit={onHandleSubmit}>
                    <div className="flex justify-between">
                        <ReactTextareaAutosize defaultValue={`${instructionSetName}`} name={`name`} className="hidden resize-none text-sm px-1 w-full hover:bg-slate-100 border-slate-100 border-2 text-black sm:block md:text-xl" />
                        <div className="flex justify-between">
                            <button type="submit"  className="flex h-10  items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                                <span className=" sr-only">Save</span>
                                <CheckIcon  className=" w-5 text-black" />
                            </button>
                            <button type="reset" onClick={handleExit} className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                                <XMarkIcon className=" w-5 text-black" />
                            </button>
                        </div>
                    </div>
                    <ol className="min-w-0 list-decimal">
                        {instructionSet.length ? instructionSet?.map((instruction, index) => (
                            <div draggable="true"
                                id={instruction.id}
                                className=
                                {`instruction ${instruction === newDraggingItem ?
                                    'dragging' : ''
                                    }`}
                                onDragStart={(e) => handleDragStart(e, instruction)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, instruction)} >
                                <InstructionIndividualEdit instruction={instruction} index={index + 1} />
                            </div>

                        )) : <></>}
                        {adding ?
                            <div>
                                <li key="newInstruction" className="fit-content text-sm md:text-base break-normal">
                                    <div className="flex justify-between" >
                                        <textarea
                                            id="textarea-id"
                                            name={`context-new`}
                                            rows={1}
                                            onChange={handleChange}
                                            onClick={() => setEditing(true)}
                                            ref={wrapperRef}
                                            value={newContext}
                                            className="flex resize-none fit-content w-full cursor-pointer py-1  hover:bg-slate-100 border-slate-100  px-5 justify-between">
                                        </textarea>
                                        <div className="w-8">
                                            <div className="flex w-8 h-8 bg-slate-100 cursor-pointer" >
                                                <CheckIcon className="mx-1 w-5 h-8 text-black cursor-pointer" onClick={() => addNewItem()} />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div> :
                            <div className="flex justify-right px-5">
                                <div className="flex w-8 h-8 bg-slate-100 cursor-pointer" >
                                    <PlusIcon onClick={() => setAdding(true)} className="mx-1 w-8 h-8 text-black cursor-pointer" />
                                </div>
                            </div>}
                    </ol>
                </form>
                :
                <><div className="flex justify-between">
                        <p className="hidden text-sm pl-2 w-15 pt-1  text-black sm:block md:text-xl">
                            {instructionSetName}
                        </p>
                        <div className="flex justify-between w-25 ">
                        <div onClick={() => setEditing(true)} className="px-5 pt-2 hover:bg-slate-100 cursor-pointer">
                            <PencilIcon  className="w-5 text-gray" />
                        </div>
                        { instructionSet.length==0 ? 
                        <button onClick={handleDelete} className="relative h-10 items-center rounded  px-4 text-sm font-medium text-red transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                            <span className="sr-only">Delete</span>
                            <TrashIcon className=" w-5 " />
                        </button> : 
                        <div>
                        
                        <button onClick={handleClickListItem} className="relative h-10 items-center rounded  px-4 text-sm font-medium text-red transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                            <span className="sr-only">Delete</span>
                            <TrashIcon className=" w-5 " />
                        </button>
                        <ConfirmDeleteDialog
                            id="ringtone-menu"
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            onDelete={handleDelete}
                            list_reference={name.list_reference}
                            recipe_id={recipe_id}
                        />
                    </div>}
                    </div>
                    </div>
                <div className="hover:bg-slate-100" onClick={() => setEditing(true)}>
                    
                    <ol key="instruction-display" className="w-full list-decimal">
                        {instructionSet.length ? instructionSet?.map((instruction) => (
                            <InstructionIndividualDisplay key={`${instruction.id}`} instruction={instruction} />
                        )) : <></>
                        }
                    </ol>
                </div></>
            }
        </div>
    )

}

export function InstructionIndividualEdit({ instruction, index }: {
    instruction: InstructionsTable, index: number
}) {
    const [editing, setEditing] = useState(false);
    const [hover, setHover] = useState(false);
    const wrapperRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState(instruction.context);
    const [deleted, setDelete] = useState(false);


    return (
        <div key={`${instruction.id}`}>{deleted ? <><input key={`${instruction.id}`} className="hidden" name={`deleted-${instruction.position}`}></input> </> :
            <li key={`${instruction.id}`} className="fit-content text-sm md:text-base break-normal">

                <div className="flex justify-between" onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <ReactTextareaAutosize
                        id="textarea-id"
                        name={`context-${index}-${instruction.id}`}
                        onLoad={() => setHover(true)}
                        rows={1}
                        onClick={() => setEditing(true)}
                        ref={wrapperRef}
                        defaultValue={value}
                        className="flex resize-none fit-content w-full cursor-pointer py-1  hover:bg-slate-100 border-slate-100  pl-5 justify-between">
                    </ReactTextareaAutosize>
                    <div className="w-8">
                        {hover ?
                            <div className="flex w-8 h-8 bg-slate-100 cursor-pointer" >
                                <label htmlFor={`delete-${instruction.position}`} onClick={() => setDelete(true)}>
                                    <XMarkIcon className=" w-8 text-black cursor-pointer" /><input id={`delete-${instruction.position}`} type="button" className="flex h-10 items-center text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                                    </input></label>
                            </div> :
                            <div className="flex">
                            <div className="w-8">
                                
                            </div>
                            </div>}
                    </div>
                </div>

            </li>}</div>
    )
}

export function InstructionIndividualDisplay({ instruction }: { instruction: InstructionsTable }) {
    return (
        <li key={`${instruction.id}`} className="fit-content text-sm md:text-base break-normal">
            <div className="flex justify-between" >
                <p
                    className="flex resize-none fit-content w-full cursor-pointer py-1  hover:bg-slate-100 border-slate-100  pl-5 justify-between">
                    {instruction.context}
                </p>
                <div className="w-8">
                </div>
            </div>
        </li>
    )
}

export interface ConfirmDeleteDialogProps {
    id: string;
    keepMounted: boolean;
    recipe_id: string;
    list_reference: string;

    open: boolean;
    onClose: (value?: string) => void;
    onDelete: (value?: string) => void;
}

export function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
    const { onClose, onDelete, list_reference: referenceProp, open, ...other } = props;
    const [value, setValue] = useState(referenceProp);
    const radioGroupRef = useRef<HTMLElement>(null);
    const deleteInstructionSetWithId = deleteInstructionSet.bind(null, props.list_reference,props.recipe_id);

    useEffect(() => {
        if (!open) {
            setValue(referenceProp);
        }
    }, [referenceProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        deleteInstructionSetWithId().then(res => onDelete())
    };


    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Delete These Instructions?</DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}