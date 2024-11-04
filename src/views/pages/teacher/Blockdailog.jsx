import React from 'react'
import {
    Box,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from '@mui/material';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';

function Blockdailog() {
    const [open, setOpen] = useState(false); // Dialog state
    const [blockReason, setBlockReason] = useState(""); // State for text input


    // Open dialog handler
    const handleOpenBlockDialog = () => {
        setOpen(true);
    };

    // Close dialog handler
    const handleCloseBlockDialog = () => {
        setOpen(false);
    };

    // Handle Block function
    const handleBlock = (teacherId) => {
        console.log("Blocking teacher:", teacherId, "for reason:", blockReason);
        handleCloseBlockDialog();
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
            {/* Block Icon */}
            <IconButton
                aria-label="block"
                size="small"
                sx={{ color: 'red' }}
                onClick={handleOpenBlockDialog} // Open the block dialog
            >
                <BlockTwoToneIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {/* Dialog for blocking */}
            <Dialog
                open={open}
                onClose={handleCloseBlockDialog}
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Light transparent background
                        color: 'black', // Ensure text is black for light mode
                        backdropFilter: 'blur(8px)', // Optional blur for glass effect
                        boxShadow: 'none', // Remove shadow
                    },
                }}
            >
                <DialogTitle>Block Teacher</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Reason for Blocking"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)} // Handle text input change
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBlockDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleBlock(teacher.teacher_id)} // Perform block action
                        color="secondary"
                    >
                        Block
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}

export default Blockdailog