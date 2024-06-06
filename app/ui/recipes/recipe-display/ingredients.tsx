'use client'

import { IngredientsTable, IngredientsHeader, } from "@/app/lib/definitions";
import { amountUpperBoundary, numberToFractionString, spaceIfExists } from "@/app/lib/utils"
import { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CheckIcon, PlusIcon, ShoppingCartIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { updateIngredientSet } from "@/app/lib/api";
import { addToShoppingList, deleteIngredientSet } from "@/app/lib/actions";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";


export default function Ingredients({ 
        names, 
        modifier, 
        recipe_id, 
    }: { 
        names: IngredientsHeader[], 
        modifier: number, 
        recipe_id: string}) {
    const [adding, setAdding] = useState(false)
    const [newIngredientSet, setNewIngredientSet] = useState<IngredientsHeader>(names[0]);
    const [shopping, setShopping] = useState(false)
    let ingredientSets = names
    const addNewIngredientSet = () => {
        // const Ingredients = <IngredientsTable>[]
        const newIngredientSet = {
            recipe_id: recipe_id,
            name: "",
            list_reference: '0',
            ingredients_table: [] as IngredientsTable[]
        };
        ingredientSets.push(newIngredientSet)
        setNewIngredientSet(newIngredientSet)
        setAdding(false);


    };
    
    console.log("test")
    console.log(ingredientSets)
    return (
        <div className="flex w-full col-span-1">
            <div className="flex w-full grid grid-rows-1 gap-6 h-min">
                <div className="flex justify-between">
                    <p className="truncate text-sm  py-2 md:text-base">
                        Ingredients:
                    </p>
                    {shopping ? <div className="flex w-8 h-8 bg-green-100 hover:bg-green-200 cursor-pointer" >
                        <ShoppingCartIcon onClick={() => setShopping(false)} className="mx-1 w-8 h-8 text-black cursor-pointer" />
                    </div> :
                        <div className="flex w-8 h-8 hover:bg-slate-100 cursor-pointer" >
                            <ShoppingCartIcon onClick={() => setShopping(true)} className="mx-1 w-8 h-8 text-black cursor-pointer" />
                        </div>
                    }
                </div>
                {ingredientSets?.map((ingredientSet) => (
                    <IngredientsBySection key={ingredientSet.list_reference} name={ingredientSet} ingredients={ingredientSet.ingredients_table} modifier={modifier} recipe_id={recipe_id} shopping={shopping} ingredientSets={ingredientSets}/>
                ))}

                {adding ?
                    <div className="pl-8 border-slate-200 border-2 rounded-r-lg">
                    </div> :
                    <div className="pl-8 border-slate-200 ">
                        <div className="flex w-8 h-8 bg-slate-100 hover:bg-slate-200 cursor-pointer" >
                            <PlusIcon onClick={() => addNewIngredientSet()} className="mx-1 w-8 h-8 text-black hover:bg-slate-200 cursor-pointer" />
                        </div>
                    </div>}
            </div>
        </div>
    )

}

export function IngredientsBySection({ 
        name, 
        ingredients, 
        modifier, 
        recipe_id, 
        shopping,
        ingredientSets,
    }: { 
        name: IngredientsHeader, 
        ingredients: IngredientsTable[], 
        modifier: number, 
        recipe_id: string, 
        shopping: boolean,
        ingredientSets: IngredientsHeader[],
    }) {
    const [editing, setEditing] = useState(false);
    // const [ingredientSet, setIngredientSet] = useState<IngredientsTable[]>(ingredients);
    const [newContext, setNewContext] = useState("")
    const [adding, setAdding] = useState(false);
    const updateIngredientSetWithId = updateIngredientSet.bind(null, name.recipe_id, name.list_reference);
    const wrapperRef = useRef<HTMLTextAreaElement>(null);
    const [open, setOpen] = useState(false);
    let ingredientSet = ingredients

    const handleExit = () => {
        setEditing(false)
        // setIngredientSet(ingredients)
    }

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setNewContext(val);
    };



    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEditing(false);
        setOpen(false);
        console.log(ingredientSet.find(i=>i.amount===1))
    }

    const handleDelete = () => {
        setEditing(false);
        setOpen(false);
        const deleteIngredientSet = ingredientSets.filter(function( obj) {
            return obj.list_reference !== name.list_reference;
        })
    }

    const addNewItem = () => {
        const separateLines = newContext.split(/\r?\n|\r|\n/g);
        separateLines.forEach(element => {
            const newIngredient = {
                id: String(0-ingredientSet.length),
                amount: 0,
                amount_upper: 0,
                units: "",
                name: element,
                shopping_list: false,
                list_reference: name.list_reference,
                recipe_id: name.recipe_id
            };
            ingredientSet.push(newIngredient)
            // if (ingredientSet.length==0) {
            //     setIngredientSet(ingredientSet => [newIngredient])
            // } else {
            //     setIngredientSet(ingredientSet => [...ingredientSet, newIngredient])
            // }
            setAdding(false);
        })
    };

    const onHandleSubmit = (e: any) => {
        console.log(new FormData(e.target))
        e.preventDefault();
        updateIngredientSetWithId(new FormData(e.target)).then(res => console.log("test")).then(
                resp => setEditing(false))
            
        
    }
    return (
        <div className="pl-8 border-slate-200 border-2 rounded-l-lg">
            {editing ?
                <form onSubmit={onHandleSubmit}>
                    <div className="flex justify-between">
                        <ReactTextareaAutosize defaultValue={`${name.name}`} name={`name`} className="hidden resize-none box-border text-sm w-[66%] hover:bg-slate-100 border-slate-100 border-2 text-black sm:block md:text-xl" />
                        <div className="flex justify-between">
                            <button type="submit" className="flex h-10  items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                                <span className=" sr-only">Save</span>
                                <CheckIcon className=" w-5 text-black" />
                            </button>
                            <button type="reset" onClick={handleExit} className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                                <XMarkIcon className=" w-5 text-black" />
                            </button>
                        </div>
                    </div>
                    <ul className="min-w-0 list-disc">
                        {ingredientSet.length ? ingredientSet?.map((ingredient, index) => (
                            <div key={ingredient.id}>
                                <IngredientIndividualEdit ingredient={ingredient} modifier={modifier} />
                            </div>

                        )) : <></>}
                        {adding ?
                            <div key="ingredientDiv">
                                <li key="newIngredient" className="fit-content text-sm md:text-base break-normal">
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
                                            <div className="flex w-5 bg-slate-100 cursor-pointer" >
                                                <CheckIcon className="mx-1 w-8 h-8 text-black cursor-pointer" onClick={() => addNewItem()} />
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
                    </ul>
                </form>
                :
                <>                    <div className="flex justify-between">
                    <p className="hidden text-sm pl-2 h-min-10 h-fit w-15 pt-1  text-black sm:block md:text-xl">
                        {name.name}
                    </p>
                    <div className="flex justify-between  w-25 ">
                    <div onClick={() => setEditing(true)} className="px-5 pt-3 hover:bg-slate-100 cursor-pointer">
                            <PencilIcon  className="w-5 text-gray" />
                        </div>
                        <div>
                        { ingredientSet.length==0 ? 
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
                </div>
                    {shopping ?
                        <div>

                            <ul key="ingredient-display" className="w-full list-disc">
                                {ingredientSet?.map((ingredient) => (
                                    <IngredientIndividualDisplay key={ingredient.id} ingredient={ingredient} modifier={modifier} shopping={shopping}/>

                                ))}
                            </ul>
                        </div> :
                        <div className="hover:bg-slate-100" onClick={() => setEditing(true)}>

                            <ul key="ingredient-display" className="w-full list-disc">
                                {ingredientSet?.map((ingredient) => (
                                    <IngredientIndividualDisplay key={ingredient.id} ingredient={ingredient} modifier={modifier} shopping={shopping}/>

                                ))}
                            </ul>
                        </div>
                    }
                </>
            }
        </div>
    )

}

export function IngredientIndividualEdit({ 
        ingredient, 
        modifier   
    }: {
        ingredient: IngredientsTable, 
        modifier: number
    }) {

    const [hover, setHover] = useState(false);
    const wrapperRef = useRef<HTMLTextAreaElement>(null);
    const value = numberToFractionString(ingredient.amount * modifier) + amountUpperBoundary(ingredient.amount_upper,modifier) + spaceIfExists(ingredient.units) + ingredient.name;
    const [deleted, setDelete] = useState(false);

    return (
        <>{deleted ? <><input className="hidden" name={`${ingredient.id}`}></input> </> :
            <li key={`${ingredient.id}`} className="fit-content text-sm md:text-base break-normal">

                <div className="flex justify-between" onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <ReactTextareaAutosize
                        id="textarea-id"
                        name={`${ingredient.id}`}
                        onLoad={() => setHover(true)}
                        rows={1}
                        ref={wrapperRef}
                        defaultValue={value}
                        className="flex resize-none fit-content w-full cursor-pointer py-1  hover:bg-slate-100 border-slate-100  pl-5 justify-between">
                    </ReactTextareaAutosize>
                    <div className="w-8">
                        {hover ?
                            <div className="flex w-8 h-8 bg-slate-100 cursor-pointer" >
                                <label htmlFor={`delete-${ingredient.id}`} onClick={() => setDelete(true)}>
                                <XMarkIcon className="w-8 text-black cursor-pointer" /><input id={`delete-${ingredient.id}`} type="button" className="flex h-10 items-center text-sm font-medium text-white transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200">
                                    </input></label>
                            </div> :
                            <div className="flex">
                                <div className="w-8">

                                </div>
                            </div>}
                    </div>
                </div>

            </li>}</>
    )
}

export function IngredientIndividualDisplay({ 
        ingredient, 
        modifier, 
        shopping 
    }: { 
        ingredient: IngredientsTable, 
        modifier: number, 
        shopping: boolean 
    }) {

    const addToShoppingListWithId = addToShoppingList.bind(null, ingredient.id, ingredient.recipe_id);

    const onHandleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        addToShoppingListWithId().then(res => ingredient.shopping_list = !ingredient.shopping_list)
            
        
    }

    return (
        <li key={`${ingredient.id}`} className="fit-content text-sm md:text-base break-normal">
            <div className="flex justify-between" >
                {shopping ? ingredient.shopping_list ?
                <form  className="flex resize-none fit-content w-full cursor-pointer py-1 bg-green-100 hover:bg-green-200 border-slate-100  pl-5 justify-between" onSubmit={onHandleSubmit}>
                        <button className="text-left"
                            >
                            {numberToFractionString(ingredient.amount * modifier)}{amountUpperBoundary(ingredient.amount_upper,modifier)}{ingredient.units} {ingredient.name}
                        </button><div className="w-8">
                </div></form> :
                    <form className="flex resize-none fit-content w-full cursor-pointer py-1   hover:bg-slate-100 border-slate-100  pl-5 justify-between" onSubmit={onHandleSubmit}>
                    <button className="text-left"
                        >
                        {numberToFractionString(ingredient.amount * modifier)}{amountUpperBoundary(ingredient.amount_upper,modifier)}{ingredient.units} {ingredient.name}
                    </button><div className="w-8">
                </div></form> :
                ingredient.shopping_list ?
                        <div className="flex resize-none fit-content w-full cursor-pointer py-1   bg-green-100 border-slate-100  pl-5 justify-between"><p
                            >
                            {numberToFractionString(ingredient.amount * modifier)}{amountUpperBoundary(ingredient.amount_upper,modifier)}{ingredient.units} {ingredient.name}
                        </p><div className="w-8">
                </div></div> :
                    <div className="flex resize-none fit-content w-full cursor-pointer py-1   hover:bg-slate-100 border-slate-100  pl-5 justify-between"><p
                        >
                        {numberToFractionString(ingredient.amount * modifier)}{amountUpperBoundary(ingredient.amount_upper,modifier)}{ingredient.units} {ingredient.name}
                    </p><div className="w-8">
                </div></div>
                }
                
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
    const deleteIngredientSetWithId = deleteIngredientSet.bind(null, props.list_reference, props.recipe_id);

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
        deleteIngredientSetWithId().then(res => onDelete())
        
    };


    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Delete These Ingredients?</DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}