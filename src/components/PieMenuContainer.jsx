/*
	PieMenuContainer.jsx
	--------------------

	We have multiple PieMenu components in the app, so we'll create a
	container component to mount them all at once.
*/

// components
import { AddPieceMenu } from './pie_menus/AddPieceMenu'
import { EditPieceMenu } from "./pie_menus/EditPieceMenu";
import { RotatePieceMenu } from "./pie_menus/RotatePieceMenu";

// PieMenuContainer component
export const PieMenuContainer = ({game, ...props}) => {

	// handle when our pie menu picks an item
	const handlePieItemSelect = (slug, idx) => {
		// console.log(`Pie item selected: ${slug} at index ${idx}`);
		game.addShapePieMenu.hide();
		game.spawnPiece(slug);
	};

	
	return (
		<>
			{/* Optionally show Pie Menu */}
			{ game.addShapePieMenu.isOpen.value && (
				<AddPieceMenu
					game={game}
					pieMenu={game.addShapePieMenu}
					onItemSelect={handlePieItemSelect}
					onMouseLeave={() => game.addShapePieMenu.hide()}
				/>	
			)}

			{/* Optionally show Edit Pie Menu */}
			{ game.editShapePieMenu.isOpen.value && (
				<EditPieceMenu
					game={game}
					pieMenu={game.editShapePieMenu}
					onItemSelect={(slug) => {
						// game.editShapePieMenu.hide();
						// game.deletePiece(slug);
					}}
					onMouseLeave={() => game.editShapePieMenu.hide()}
				/>
			)}
			
			{/* Optionally show Rotate Pie Menu */}
			{ game.rotateShapePieMenu.isOpen.value && (
				<RotatePieceMenu
					game={game}
					pieMenu={game.rotateShapePieMenu}
					onItemSelect={(slug) => {
						// game.rotateShapePieMenu.hide();
						// game.rotatePiece(slug);
					}}
					onMouseLeave={() => game.rotateShapePieMenu.hide()}
				/>
			)}
		</>
	);
}
