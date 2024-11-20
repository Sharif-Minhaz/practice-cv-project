import { useState } from "react";
import { Text, Image, SimpleGrid, Group, rem, Box } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

export default function ImageDropzone({ form }) {
	const [files, setFiles] = useState([]);

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file);
		return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
	});

	const handleSetImage = (files) => {
		console.log(files);
		setFiles(files);
		form.setFieldValue("profileImage", URL.createObjectURL(files[0]));
	};

	const eraseImage = () => {
		setFiles([]);
	};

	return (
		<div>
			<Box mb={2} style={{ fontSize: "15px" }}>
				Upload profile image
			</Box>
			{!previews.length ? (
				<Dropzone
					onDrop={handleSetImage}
					onReject={(files) => console.log("rejected files", files)}
					maxFiles={1}
					maxSize={5 * 1024 ** 2}
					accept={IMAGE_MIME_TYPE}
					style={{ border: "1px solid #e3e3e3" }}
					w={200}
					radius="md"
				>
					<Group
						justify="center"
						align="center"
						gap="xl"
						mih={220}
						style={{ pointerEvents: "none" }}
					>
						<Dropzone.Accept>
							<IconUpload
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-blue-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-red-6)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-dimmed)",
								}}
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text size="xl" inline ta="center" px="md" lh={1.2} c="gray">
								Drag image here or click to select file
							</Text>
						</div>
					</Group>
				</Dropzone>
			) : (
				<SimpleGrid cols={{ base: 1, sm: 4 }}>
					<Box
						display="inline-block"
						bd={1}
						style={{ borderStyle: "solid", borderColor: "#e0e0e0" }}
						pos="relative"
					>
						{previews}
						<Box pos="absolute" top={1} right={1}>
							<IconX
								style={{
									width: rem(52),
									height: rem(52),
									color: "var(--mantine-color-red-6)",
								}}
								cursor="pointer"
								stroke={1.5}
								onClick={eraseImage}
							/>
						</Box>
					</Box>
				</SimpleGrid>
			)}
		</div>
	);
}
