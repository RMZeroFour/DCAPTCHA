import styles from './AdminStats.module.css';
import React, { useState } from "react";
import {ToggleSwitch} from "./ToggleSwitch";

export function AdminLayerControl() {
   // const [currentTab, setCurrentTab] = useState(0);
    const [layerStates, setLayerStates] = useState({
        layer1: false,
        layer2: false,
        layer3Matching: false,
       // layer3Maze: false,
    });

    const handleToggle = (layer) => {
        setLayerStates((prevStates) => ({
            ...prevStates,
            [layer]: !prevStates[layer],
        }));
    };

    const handleLayerSwitching = () => {}; //layer on/off logic

    return (
        <>
            <div>
                <ToggleSwitch 
                    label="Layer 1" 
                    checked={layerStates.layer1} 
                    onChange={() => {
                        handleToggle('layer1');
                        handleLayerSwitching(); 
                    }} 
                />
                <ToggleSwitch 
                    label="Layer 2" 
                    checked={layerStates.layer2} 
                    onChange={() => {
                        handleToggle('layer2');
                        handleLayerSwitching(); 
                    }} 
                />
                <ToggleSwitch 
                    label="Layer 3 - Matching" 
                    checked={layerStates.layer3Matching} 
                    onChange={() => {
                        handleToggle('layer3Matching');
                        handleLayerSwitching(); 
                    }} 
                />
            </div>
        </>
    );
}
