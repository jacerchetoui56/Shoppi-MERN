import React, { useState } from 'react'
import '../styles/dropdown.css'
import { FiChevronDown } from 'react-icons/fi'

export default function SelectionDropDown({ name, options }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)


    return (
        <div className='drop-down'>
            <div className="selected-option" onClick={() => setIsOpen(prev => !prev)}>
                <span>{options[selectedIndex] || name}</span>
                <FiChevronDown className={isOpen ? 'icon open' : "icon"} />
            </div>
            <div className={isOpen ? "other-options open" : "other-options"}>
                {
                    options.map((option, index) => {
                        return <div
                            className={selectedIndex === index ? "option selected" : "option"}
                            onClick={() => {
                                setSelectedIndex(options.indexOf(option))
                                setIsOpen(false)
                            }
                            }
                        > {option}</div>
                    })
                }
            </div>

        </div >
    )
}
