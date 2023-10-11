import {motion} from 'framer-motion';
export function Notifications(){
    return(
        <motion.div 
        className="bg-accent rounded-xl p-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        >
            <div className='text-neutral-500 text-center'>
            No notifications
            </div>
    </motion.div>
    )
}