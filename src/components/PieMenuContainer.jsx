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
import { SortPieceMenu } from './pie_menus/SortPieceMenu';
import { ColorPieceMenu } from './pie_menus/ColorPieceMenu';

// PieMenuContainer component
export const PieMenuContainer = ({game, ...props}) => {

	// handle when our pie menu picks an item
	const handlePieItemSelect = (slug, idx) => {
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

			{/* Optionally show Sort Order Pie Menu */}
			{ game.sortShapePieMenu.isOpen.value && (
				<SortPieceMenu
					game={game}
					pieMenu={game.sortShapePieMenu}
					onItemSelect={(slug) => {
					}}
					onMouseLeave={() => game.sortShapePieMenu.hide()}
				/>
			)}

			{/* Optionally show Color Pie Menu */}
			{ game.colorShapePieMenu.isOpen.value && (
				<ColorPieceMenu
					game={game}
					pieMenu={game.colorShapePieMenu}
					onItemSelect={(slug) => {
						// game.colorShapePieMenu.hide();
						// game.pickColor(slug);
					}}
					onMouseLeave={() => game.colorShapePieMenu.hide()}
				/>
			)}

		</>
	);
}
