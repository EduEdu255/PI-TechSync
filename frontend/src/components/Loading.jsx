import  Loader from "/images/loading.gif";
import styles from "../assets/css/Loading.module.css";

export function Loading() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.img}>
                    <img src={Loader}/>
                </div>
            </div>
        </>
    )
}

export default Loading;