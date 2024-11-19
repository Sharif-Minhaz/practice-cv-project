import { Button, Group, TextInput, Grid, Stack, Box, Divider, Flex, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import ImageDropzone from "./ImageDropzone";
import { IMaskInput } from "react-imask";
import RichTextEditorComponent from "./RichTextEditorComponent";
import { useRef } from "react";
import Eduction from "./Eduction";
import ProfessionalExperience from "./ProfessionalExperience";

export default function CVForm() {
	const richTextRef = useRef();
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			profileImage: "",
			fname: "",
			designation: "",
			email: "",
			mobile: "",
			github: "",
			linkedIn: "",
			website: "",
			summary: "",
			education: [{ orgName: "", duration: "", title: "", grade: 0 }],
			technicalSkills: "",
			professionalExp: [{ orgName: "", duration: "", designation: "", role: "" }],
			portfolio: "",
			languages: "",
		},

		validate: {
			fname: (value) => (value.trim().length > 0 ? null : "First name is required"),
			designation: (value) => (value.trim().length > 0 ? null : "Designation is required"),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email address"),
			mobile: (value) => (/^\d{11}$/.test(value) ? null : "Mobile number must be 11 digits"),
			github: (value) =>
				value.trim().length > 0
					? /^https:\/\/github.com\/\S+$/.test(value)
						? null
						: "Invalid GitHub URL"
					: "Github link is required",
			linkedIn: (value) =>
				value.trim().length > 0
					? /^https:\/\/(www\.)?linkedin.com\/\S+$/.test(value)
						? null
						: "Invalid LinkedIn URL"
					: "Linked In link is required",
			website: (value) =>
				value.trim().length > 0
					? /^https?:\/\/\S+$/.test(value)
						? null
						: "Invalid website URL"
					: "Website link is required",
			summary: (value) => (value.trim().length > 0 ? null : "Summary is required"),
			education: (values) =>
				values.every((edu) => edu.orgName.trim() && edu.title.trim())
					? null
					: "Education fields are required",
			// technicalSkills: (value) =>
			// 	value.trim().length > 0 ? null : "Technical skills are required",
			// professionalExp: (values) =>
			// 	values.every((exp) =>
			// 		exp.orgName.trim() && exp.designation.trim() && exp.role.trim() ? true : false
			// 	)
			// 		? null
			// 		: "All professional experience fields are required",
			// portfolio: (values) =>
			// 	values.every((item) =>
			// 		item.title.trim() && item.technologies.trim() ? true : false
			// 	)
			// 		? null
			// 		: "Portfolio fields are required",
			// languages: (value) => (value.trim().length > 0 ? null : "Languages are required"),
		},
	});

	const addEducation = () => {
		form.insertListItem("education", { orgName: "", duration: "", title: "", grade: "" });
	};

	// Remove specific education fieldset
	const removeEducation = (index) => {
		form.removeListItem("education", index);
	};

	const handleSubmit = (values) => {
		console.log(values);
	};

	const handleSummaryChange = (value) => {
		form.setFieldValue("summary", value);
		console.log(value);

		if (richTextRef.current) {
			const content = richTextRef.current.innerHTML;
			console.log("Extracted HTML:", content);
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<ImageDropzone />
			<Divider mb={4} mt={14} />
			<Grid>
				{/* full name field */}
				<Grid.Col span={6}>
					<TextInput
						withAsterisk
						label="Full Name"
						placeholder="John Doe"
						key={form.key("fname")}
						mt={8}
						{...form.getInputProps("fname")}
					/>
				</Grid.Col>
				{/* email address field */}
				<Grid.Col span={6}>
					<TextInput
						withAsterisk
						label="Your Email Address"
						placeholder="john@gmail.com"
						key={form.key("email")}
						mt={8}
						{...form.getInputProps("email")}
					/>
				</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={6}>
					{/* phone number field */}
					<TextInput
						component={IMaskInput}
						withAsterisk
						label="Your Phone number"
						mask="+88 00000-000000"
						placeholder="Your phone"
						mt={8}
						{...form.getInputProps("mobile")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					{/* github link */}
					<TextInput
						withAsterisk
						label="Your github link"
						key={form.key("github")}
						mt={8}
						{...form.getInputProps("github")}
					/>
				</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={6}>
					{/* linked in link */}
					<TextInput
						withAsterisk
						label="Your linked in link"
						key={form.key("linkedIn")}
						mt={8}
						{...form.getInputProps("linkedIn")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					{/* website link here */}
					<TextInput
						withAsterisk
						label="Your website link"
						key={form.key("website")}
						mt={8}
						{...form.getInputProps("website")}
					/>
				</Grid.Col>
			</Grid>
			{/* ----------- summary here ---------- */}
			<Stack mt={12}>
				<Box style={{ fontSize: "15px" }}>Summary</Box>
				<RichTextEditorComponent
					value={form.values.summary}
					onChange={handleSummaryChange}
					placeholder="Enter your summary"
				/>
			</Stack>

			{/* education section */}
			<Flex align="center" justify="space-between" mt={32} mb={8}>
				<Text size="22px">Education</Text>
				<Button onClick={addEducation}>Add</Button>
			</Flex>
			<Divider />
			{form.values?.education?.map((_, index) => (
				<Eduction removeEducation={removeEducation} index={index} form={form} key={index} />
			))}

			{/* professional experience section */}
			<ProfessionalExperience />

			<Group justify="flex-end" mt="md">
				<Button type="submit">Submit</Button>
			</Group>
		</form>
	);
}
