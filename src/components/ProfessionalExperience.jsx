import { Grid, TextInput } from "@mantine/core";
import RichTextEditorComponent from "./RichTextEditorComponent";

export default function ProfessionalExperience() {
	return (
		<Grid mt={10}>
			<Grid.Col span={4}>
				<TextInput withAsterisk label="Organization Name" placeholder="ABC" />
			</Grid.Col>
			<Grid.Col span={4}>
				<TextInput withAsterisk label="Title" placeholder="SWE Engineer" />
			</Grid.Col>
			<Grid.Col span={4}>
				<TextInput withAsterisk label="Designation" placeholder="Course ABC" />
			</Grid.Col>
			<Grid.Col span={12}>
				<RichTextEditorComponent />
			</Grid.Col>
		</Grid>
	);
}
