import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion"; // Keep AnimatePresence for smooth top card change
import CardLayout from "./CardLayout"; // Adjust path if necessary

const DrawPile = ({ remainingCards, remainingCount, isDisabled, isPlayer1Turn, onDrawCard }) => {
    // Get the actual top card object (the next one to draw)
    const topCard = remainingCards.length > 0 ? remainingCards[0] : null;

    return (
        <motion.div
            layout // Animate container size changes if needed
            // Position it vertically centered on the left
            className={`absolute left-4 top-1/2 transform -translate-y-1/2
                        flex flex-col items-center // Stack count above card
                        p-2 border rounded shadow-md bg-gray-100 transition-opacity
                        ${
                            isDisabled
                                ? "opacity-50 cursor-not-allowed pointer-events-none" // Disabled state
                                : "cursor-pointer hover:bg-gray-200" // Enabled state
                        }`}
            onClick={!isDisabled ? onDrawCard : undefined} // Use the passed function
            title={
                isDisabled
                    ? "Cannot draw now"
                    : `Click to draw (${isPlayer1Turn ? "P1" : "P2"}) (${remainingCount} left)` // Tooltip
            }
        >
            <p className="font-semibold mb-1 text-xs">Draw Pile</p> {/* Title */}
            {/* Use AnimatePresence to animate the change when the top card updates */}
            <AnimatePresence mode="wait">
                {topCard ? (
                    <motion.div
                        key={topCard.key + "-draw-top"} // Key forces re-render on card change
                        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: -90 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
                        transition={{ duration: 0.3 }}
                        className="transform origin-center my-1" // Add some margin and ensure rotation is centered
                        style={{ minWidth: "60px", minHeight: "100px" }} // Give it space
                    >
                        {/* Render CardLayout with actual numbers, not back */}
                        <CardLayout
                            _const={topCard._const} // Pass the number
                            count={topCard.count} // Pass the number
                            disabled={isDisabled} // Visual cue
                            // Ensure 'r' (rotated rendering if CardLayout supports it) or handle rotation via CSS
                            r={true} // Assuming CardLayout uses 'r' for rotated style internally, otherwise remove if handled by wrapper div's rotate
                        />
                    </motion.div>
                ) : (
                    // Optional: Placeholder if pile is empty (though parent shouldn't render it then)
                    <motion.div
                        key="empty-draw-placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-[60px] h-[100px] my-1" // Placeholder size similar to CardLayout
                    >
                        {/* Empty div or placeholder graphic */}
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="mt-1 text-sm text-gray-600">{remainingCount} left</p> {/* Remaining count */}
        </motion.div>
    );
};

// Prop types remain the same
DrawPile.propTypes = {
    remainingCards: PropTypes.arrayOf(PropTypes.object).isRequired,
    remainingCount: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isPlayer1Turn: PropTypes.bool.isRequired,
    onDrawCard: PropTypes.func.isRequired,
};

export default DrawPile;
