import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {ID} from "appwrite";
import {Box, Typography, Input, Slider, Button, Switch} from "@mui/material";
import {AutoAwesome} from "@mui/icons-material";
import pptxgen from "pptxgenjs";
import Swal from "sweetalert2";
import axios from "axios";

function Create({setPage, endpoint, storeKey, storage, setCurrentPresentation, setLoading}){
	const navigate = useNavigate();

    const [presentationTitle, setPresentationTitle] = useState("");

    const [authorName, setAuthorName] = useState("");

    const [slidesLength, setSlidesLength] = useState(5);

    const [aiImages, setAiImages] = useState(false);

    const [privateSlides, setPrivateSlides] = useState(false);

    const [presentationDescription, setPresentationDescription] = useState("");

    const [template, setTemplate] = useState(0);

    const templates = [
        {
            background: "FFFFFF",
            title: "000000",
            text: "000000",
            chart: "000000",
            table: "000000"
        },
        {
            background: "000000",
            title: "FFFFFF",
            text: "FFFFFF",
            chart: "FFFFFF",
            table: "FFFFFF"
        },
        {
            background: "FFFFFF",
            title: "597AFF",
            text: "000000",
            chart: "000000",
            table: "000000"
        },
        {
            background: "FFFFFF",
            title: "723BFF",
            text: "000000",
            chart: "000000",
            table: "000000"
        },
        {
            background: "000000",
            title: "597AFF",
            text: "FFFFFF",
            chart: "FFFFFF",
            table: "FFFFFF"
        },
        {
            background: "000000",
            title: "723BFF",
            text: "FFFFFF",
            chart: "FFFFFF",
            table: "FFFFFF"
        },
        {
            url: "https://cloud.appwrite.io/v1/storage/buckets/67eb17c600305d58c1a6/files/67ec042b002d78bd66d9/view?project=67eb176b002ca24f3bcc&mode=admin",
            title: "2F2C2C",
            text: "480DBD",
            chart: "000000",
            table: "000000"
        },
        {
            url: "https://cloud.appwrite.io/v1/storage/buckets/67eb17c600305d58c1a6/files/67ec01fb0000d9ca7d3c/view?project=67eb176b002ca24f3bcc&mode=admin",
            title: "2F2C2C",
            text: "2A2727",
            chart: "000000",
            table: "000000"
        },
        {
            url: "https://cloud.appwrite.io/v1/storage/buckets/67eb17c600305d58c1a6/files/67ec038b00042e68fac9/view?project=67eb176b002ca24f3bcc&mode=admin",
            title: "56519F",
            text: "413D7D",
            chart: "000000",
            table: "000000"
        },
        {
            url: "https://cloud.appwrite.io/v1/storage/buckets/67eb17c600305d58c1a6/files/67ec076200342e469472/view?project=67eb176b002ca24f3bcc&mode=admin",
            title: "D9D9D9",
            text: "6BB47F",
            chart: "FFFFFF",
            table: "FFFFFF"
        },
        {
            url: "https://cloud.appwrite.io/v1/storage/buckets/67eb17c600305d58c1a6/files/67ec08570006a30c3d28/view?project=67eb176b002ca24f3bcc&mode=admin",
            title: "393838",
            text: "737373",
            chart: "000000",
            table: "000000"
        },
        {
            url: "https://cloud.appwrite.io/v1/storage/buckets/67eb17c600305d58c1a6/files/67ec08dd0035e2c4e7b3/view?project=67eb176b002ca24f3bcc&mode=admin",
            title: "FFFFFF",
            text: "D9D9D9",
            chart: "FFFFFF",
            table: "FFFFFF"
        },
        {
            url: "https://cloud.appwrite.io/v1/storage/buckets/67eb17c600305d58c1a6/files/67ec1afe002d5121afc9/view?project=67eb176b002ca24f3bcc&mode=admin",
            title: "FFFFFF",
            text: "FFFFFF",
            chart: "FFFFFF",
            table: "FFFFFF"
        }
    ];

    const sendPrompt = () => {
        if (presentationTitle && authorName && slidesLength && presentationDescription){
	        setLoading(true);

            axios.get(`${endpoint}/prompt`, {
                headers: {
                    "x-prompt-input": JSON.stringify({
                        presentationTitle: presentationTitle,
                        authorName: authorName,
                        slidesLength: slidesLength,
                        aiImages: aiImages,
                        presentationDescription: presentationDescription
                    })
                }
            }).then((res) => {
                const data = res.data;

                createPresentation(data);
            });
        }
        else{
		    Swal.fire({
		        toast: true,
		        position: "bottom-left",
		        icon: "info",
		        title: "Please fill all the fields!",
		        showConfirmButton: false,
		        timer: 3000,
		        timerProgressBar: true
		    });
        }
    };

    const createPresentation = (data) => {
        const presentation = new pptxgen();

        const slides = Object.entries(data.output);

        const images = data.images;

        slides.forEach((content, index) => {
            const slide = presentation.addSlide();

            if (templates[template].url){
                slide.addImage({
                    path: templates[template].url,
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: "100%",
                    sizing: {
                        type: "cover"
                    }
                });
            }
            else {
                slide.background = {
                    color: templates[template].background
                };
            }

            if (content[0].includes("frontPage")){
                slide.addText(content[1].author, {
                    x: 0,
                    y: 0.5,
                    w: "100%",
                    align: "center",
                    color: templates[template].text
                });

                slide.addText(content[1].title, {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: "100%",
                    color: templates[template].title,
                    align: "center",
                    valine: "center",
                    bold: true
                });
            }
            else if (content[0].includes("normal")){
                slide.addText(content[1].title, {
                    x: 0,
                    y: 0.5,
                    w: "100%",
                    color: templates[template].title,
                    align: "center",
                    bold: true
                });

                const bodyContent = [];

                Object.values(content[1].body).forEach((point) => {
                    bodyContent.push({
                        text: point,
                        options: {
                            bullet: true,
                            breakLine: true
                        }
                    });
                });

                slide.addText(bodyContent, {
                    x: (index % 2 === 0 ? "5%" : "45%"),
                    y: 0,
                    w: "50%",
                    h: "100%",
                    align: "left",
                    valine: "middle",
                    color: templates[template].text
                });

                if (data.aiImages){
                    slide.addImage({
                        data: images[content[0]],
                        x: (index % 2 === 0 ? "60%" : "5%"),
                        y: "32%",
                        w: "35%",
                        h: "35%",
                        sizing: {
                            type: "contain"
                        }
                    });
                }
                else{
                    slide.addImage({
                        path: images[content[0]],
                        x: (index % 2 === 0 ? "60%" : "5%"),
                        y: "32%",
                        w: "35%",
                        h: "35%",
                        sizing: {
                            type: "contain"
                        }
                    });
                }
            }
            else if (content[0].includes("subChart")){
                const chartData = [content[1].data];

                slide.addChart(presentation.ChartType[content[1].type], chartData, {
                    x: (index % 2 === 0 ? 5.7 : 0.3),
                    y: 1.7,
                    w: "40%",
                    h: "40%",
                    showPercent: true,
                    showLegend: true,
                    legendColor: templates[template].chart,
                    catAxisLabelColor: templates[template].chart,
                    valAxisLabelColor: templates[template].chart,
                    dataLabelColor: templates[template].chart
                });

                slide.addText(content[1].title, {
                    x: 0,
                    y: 0.5,
                    w: "100%",
                    color: templates[template].title,
                    align: "center",
                    bold: true
                });

                const bodyContent = [];

                Object.values(content[1].body).forEach((point) => {
                    bodyContent.push({
                        text: point,
                        options: {
                            bullet: true,
                            breakLine: true
                        }
                    });
                });

                slide.addText(bodyContent, {
                    x: (index % 2 === 0 ? "5%" : "45%"),
                    y: "20%",
                    w: "50%",
                    h: "70%",
                    align: "left",
                    valine: "middle",
                    color: templates[template].text
                });
            }
            else if (content[0].includes("fullChart")){
                slide.addText(content[1].title, {
                    x: 0,
                    y: 0.5,
                    w: "100%",
                    color: templates[template].title,
                    align: "center",
                    bold: true
                });

                const chartData = [content[1].data];

                slide.addChart(presentation.ChartType[content[1].type], chartData, {
                    x: "50%",
                    y: "50%",
                    w: "80%",
                    h: "80%",
                    showPercent: true,
                    showLegend: true,
                    titleColor: "FFFFFF",
                    legendColor: templates[template].chart,
                    catAxisLabelColor: templates[template].chart,
                    valAxisLabelColor: templates[template].chart,
                    dataLabelColor: templates[template].chart
                });
            }
            else if (content[0].includes("subTable")){
                const tableData = content[1].data;

                slide.addTable(tableData, {
                    x: (index % 2 === 0 ? 5.7 : 0.3),
                    y: 1.7,
                    w: "40%",
                    h: "40%",
                    color: templates[template].text,
                    border: {
                        type: "solid",
                        color: templates[template].table,
                        pt: 1
                    }
                });

                slide.addText(content[1].title, {
                    x: 0,
                    y: 0.5,
                    w: "100%",
                    color: templates[template].title,
                    align: "center",
                    bold: true
                });

                const bodyContent = [];

                Object.values(content[1].body).forEach((point) => {
                    bodyContent.push({
                        text: point,
                        options: {
                            bullet: true,
                            breakLine: true
                        }
                    });
                });

                slide.addText(bodyContent, {
                    x: (index % 2 === 0 ? "5%" : "45%"),
                    y: "20%",
                    w: "50%",
                    h: "70%",
                    align: "left",
                    valine: "middle",
                    color: templates[template].text
                });
            }

            else if (content[0].includes("fullTable")){
                slide.addText(content[1].title, {
                    x: 0,
                    y: 0.5,
                    w: "100%",
                    color: templates[template].title,
                    align: "center",
                    bold: true
                });
                
                const tableData = content[1].data;

                slide.addTable(tableData, {
                    x: "10%",
                    y: "20%",
                    w: "80%",
                    h: "70%",
                    color: templates[template].table,
                    border: {
                        type: "solid",
                        color: templates[template].table,
                        pt: 1
                    }
                });
            }
            else if (content[0].includes("endPage")){
                slide.addText(content[1].title, {
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: "100%",
                    color: templates[template].title,
                    align: "center",
                    valine: "center",
                    bold: true
                });
            }
        });

	    presentation.write("blob").then((blob) => {
	    	const id = ID.unique();

	        const file = new File([blob], `${id}.pptx`);

	    	storage.createFile(storeKey, id, file).then((response) => {
				const fileId = response.$id;

				const fileUrl = storage.getFileView(storeKey, fileId);
	    	
				const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;

				setCurrentPresentation({
					name: presentationTitle,
					data: presentation,
					fileId: fileId,
					url: officeViewerUrl,
                    private: privateSlides
				});

				setLoading(false);

				navigate("/view");
	    	});
	    });
    };

	useEffect(() => {
		setPage("create");

		setLoading(true);

        axios.get(`${endpoint}/`).then((res) => {
            const data = res.data;

            if (data.message === "connected"){
                setLoading(false);
            }
        });
	}, []);

	return (
		<Box className="page" sx={{
			width: "100%",
			height: "auto",
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			overflowY: "auto"
		}}>
			<Typography variant="h3" align="center" sx={{
				margin: "150px 0px 0px 0px",
				color: "#fff"
			}}>
				Generate Presentation
			</Typography>

			<Input placeholder="Presentation Title" type="text" sx={{
				width: "600px",
				maxWidth: "90%",
				margin: "30px 0px 0px 0px",
				padding: "10px",
				color: "#fff",
				background: "rgba(255, 255, 255, 0.1)",
				borderBottom: "1px solid #ff148a"
			}} value={presentationTitle} onChange={(event) => setPresentationTitle(event.target.value)}/>

			<Input placeholder="Author Name" type="text" sx={{
				width: "600px",
				maxWidth: "90%",
				margin: "10px 0px 0px 0px",
				padding: "10px",
				color: "#fff",
				background: "rgba(255, 255, 255, 0.1)",
				borderBottom: "1px solid #ff148a"
			}} value={authorName} onChange={(event) => setAuthorName(event.target.value)}/>

			<Typography variant="body1" align="left" sx={{
				fontWeight: "bold",
				margin: "20px 0px 0px 0px",
				color: "#777",
				width: "550px",
				maxWidth: "80%"
			}}>
				Slides Length
			</Typography>

			<Slider defaultValue={5} min={3} max={10} aria-label="Default" valueLabelDisplay="auto" sx={{
				width: "550px",
				maxWidth: "80%"
			}} value={slidesLength} onChange={(event) => setSlidesLength(event.target.value)}/>

            <Box sx={{
                margin: "10px 0px 10px 0px",
                padding: "10px 10px 10px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "10px"
            }}>
                <Typography variant="body1" sx={{
                    fontWeight: "bold",
                    color: "#fff"
                }}>
                    AI Images
                </Typography>

                <Switch value={aiImages} onChange={() => setAiImages(!aiImages)}/>
            </Box>

            <Box sx={{
                margin: "10px 0px 10px 0px",
                padding: "10px 10px 10px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "10px"
            }}>
                <Typography variant="body1" sx={{
                    fontWeight: "bold",
                    color: "#fff"
                }}>
                    Private Slides
                </Typography>

                <Switch value={privateSlides} onChange={() => setPrivateSlides(!privateSlides)}/>
            </Box>

			<Input placeholder="Presentation Description" type="text" multiline rows={5} sx={{
				width: "600px",
				maxWidth: "90%",
				margin: "10px 0px 0px 0px",
				padding: "10px",
				color: "#fff",
				background: "rgba(255, 255, 255, 0.1)",
				borderBottom: "1px solid #ff148a"
			}} value={presentationDescription} onChange={(event) => setPresentationDescription(event.target.value)}/>

            <Typography variant="body1" align="left" sx={{
                fontWeight: "bold",
                margin: "20px 0px 0px 0px",
                color: "#777",
                width: "550px",
                maxWidth: "80%"
            }}>
                Select Template
            </Typography>

            <Box className="templates" sx={{
                width: "800px",
                maxWidth: "90%",
                height: "auto",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "20px",
                margin: "0px 0px 10px 0px",
                padding: "20px 10px 20px 10px",
                overflowX: "auto"
            }}>
                {templates.map((value, index) => {
                    return (
                        <Box key={index} sx={{
                            minWidth: "200px",
                            width: "200px",
                            height: "100px",
                            borderRadius: "30px",
                            padding: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            border: "1px solid #fff",
                            background: (value.background ? `#${value.background}` : ""),
                            backgroundImage: (value.url ? `url(${value.url})` : ""),
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                            outline: (index === template ? "3px solid #ff148a" : ""),
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }} onClick={() => setTemplate(index)}>
                            <Typography variant="h6" sx={{
                                color: `#${value.title}`
                            }}>
                                Title
                            </Typography>

                            <Typography variant="body1" sx={{
                                color: `#${value.text}`
                            }}>
                                Body
                            </Typography>
                        </Box>
                    )
                })}
            </Box>

			<Button sx={{
				margin: "30px 0px 30px 0px",
				padding: "10px 20px",
				background: "linear-gradient(to right, #ff148a, #ff75ba)",
				borderRadius: "50px",
				fontWeight: "bold",
				color: "#fff",
				boxShadow: "2px 4px 8px rgba(255, 115, 185, 0.5)"
			}} onClick={sendPrompt}>
				<AutoAwesome sx={{
					margin: "-2px 4px 0px 0px"
				}}/>

				Generate
			</Button>
		</Box>
	);
}

export default Create;