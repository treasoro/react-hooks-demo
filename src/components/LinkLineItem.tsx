import { useEffect, useState } from "react"

export default function LinkLineItem() {
    const [isLinked, setIsLinked] = useState(false);
    const [lineItems, setLineItems] = useState<LineItem[]>([])
    const [selectedLineItem, setSelectedLineItem] = useState<LineItem>()
    const [selected, setSelected] = useState(false)


    type LineItem = {
        id: number | null;
        name: string | null;
    }

    function handlesubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLinked(!isLinked);
    }

    function handleUnlinkClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        setSelectedLineItem(undefined)
        setIsLinked(false)
        setSelected(false)
    }

    function handleSelectChanged(e: React.ChangeEvent<HTMLSelectElement>) {
        const index = Number(e.target.value);
        const selectedItem = lineItems.find((element:LineItem) => element.id === index)
        setSelectedLineItem(selectedItem)
        setSelected(true)
    }

    useEffect(() => {
        const tempItems:LineItem[] = [
            { 
                id: 0,
                name: "Donations",
            },
            {
                id: 1,
                name: "Fundraiser: Fall Festival"
            }            
        ]

        setLineItems([...tempItems])
    }, [])

    return (
        <>
            <h2 className="mb-4 text-2xl">Line Items</h2>
            <form onSubmit={handlesubmit}>
                {!isLinked &&
                    <>
                        <select className="select select-bordered w-full max-w-xs me-4" defaultValue={String(selectedLineItem?.id || 0)} onChange={handleSelectChanged} name="lineitems" required>
                            <option value="0" disabled>Select Line Item</option>
                            {lineItems.map((item) => {
                                return (
                                    <option key={item.id} value={String(item.id)}>{item.name}</option>
                                )
                            })}
                        </select>
                        <button className="btn btn-primary" disabled={!selected}>Link</button>
                    </>
                }
                {isLinked &&
                    <>
                        <span className="me-4">It's linked to {selectedLineItem?.name}</span>
                        <a href="" className="btn btn-error" onClick={handleUnlinkClick}>Unlink</a>
                    </>
                }
                
            </form>
        </>
    )
}