/*
	AddPieceMenu.jsx
	----------------

	This component will be a light wrapper for a PieMenu component,
	configured for the Tangram pieces.
*/

// components
import { PieMenu } from '../PieMenu';
import { PieItem } from '../PieItem';
import { Shape } from '../Shape';

// app data
import { shapeData } from '../../classes/Piece';

// PieMenu component
export const AddPieceMenu = ({game, onItemSelect, children, ...props}) => {

	return (
		<PieMenu 
			menuSize={400}
			{...props}
			onItemSelect={onItemSelect}
		>
			<PieItem title="Small Square" slug="squareSM">
				<Shape shape="squareSM" color={shapeData["squareSM"].defaultColor} rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Medium Square" slug="squareMD">
				<Shape shape="squareMD" color={shapeData["squareMD"].defaultColor} rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Large Square" slug="squareLG">
				<Shape shape="squareLG" color={shapeData["squareLG"].defaultColor} rawScale={0.45}></Shape>
			</PieItem>
			<PieItem title="Small Triangle" slug="triangleSM">
				<Shape shape="triangleSM" color={shapeData["triangleSM"].defaultColor} rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Medium Triangle" slug="triangleMD">
				<Shape shape="triangleMD" color={shapeData["triangleMD"].defaultColor} rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Large Triangle" slug="triangleLG">
				<Shape shape="triangleLG" color={shapeData["triangleLG"].defaultColor} rawScale={0.45}></Shape>
			</PieItem>
			<PieItem title="Parallelogram A" slug="parallelogramA">
				<Shape shape="parallelogramA" color={shapeData["parallelogramA"].defaultColor} rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Parallelogram B" slug="parallelogramB">
				<Shape shape="parallelogramB" color={shapeData["parallelogramB"].defaultColor} rawScale={0.5}></Shape>
			</PieItem>
			<PieItem title="Trapezoid" slug="trapezoid">
				<Shape shape="trapezoid" color={shapeData["trapezoid"].defaultColor} rawScale={0.5}></Shape>
			</PieItem>
		</PieMenu>
	);
}
