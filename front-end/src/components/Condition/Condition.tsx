import React from "react";
import styles from "./Condition.module.css";

export default function Condition() {

  function save(ev){
    var newValue=ev.target.textContent;
  }
  
  return (
    <div>
        <div className={styles.caja}>
            <p>Privacy Policy</p>
        </div>
          <br></br>
          <div>
            <p contentEditable="true" onBlur={save} className={styles.box1}>Privacy Policy for Trekker</p>
          </div>    
         <br></br>
        <div className={styles.botoncta}><p>Update</p></div>
    </div>
  );
}