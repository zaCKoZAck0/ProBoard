import { motion } from "framer-motion";

export function CreatingOrg(){
    return(
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex flex-col items-center justify-center"
        >
        </motion.div>
    )
}