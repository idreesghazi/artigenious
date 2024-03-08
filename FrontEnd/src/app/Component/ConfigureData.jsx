import { useState } from 'react'

function ConfigureData() {
    const [chatbotModel, setChatbotModel] = useState("OpenAI");
    const [chatbotResponse, setChatbotResponse] = useState("");
    const [ytURL, setYtURL] = useState("");
    const [webURL, setWebURL] = useState("");
    const [pdf, setPdf] = useState("");

    const handleSelectionBoxChange = (event) => {
        setChatbotModel(event.target.value);
    };

    // Handlers to update the state whenever the input values change
    const handleYtURL = (event) => {
        setYtURL(event.target.value);
    };

    const handleWebURL = (event) => {
        setWebURL(event.target.value);
    };

    const handlePDF = (event) => {
        const selectedFile = event.target.files[0];
        setPdf(selectedFile);
    };

    const handleSaveData = async (e) => {
        try {
            if (pdf === null && ytURL === "" && webURL === "") {
                throw new Error('No data was entered.');
            }
            const formData = new FormData();
            formData.append('ytURL', ytURL);
            formData.append('webURL', webURL);
            formData.append('pdfFile', pdf);
            formData.append('model', chatbotModel);

            // Send the user's message to the Flask API
            const response = await fetch('http://localhost:5002/setData', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch the chatbot response.');
            }

            // Get the chatbot's response from the API
            const data = await response.json();
            const chatbotRes = data.response;

            // Add the chatbot's response to the chat messages
            setChatbotResponse(chatbotRes);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='configureBox bg-black text-white w-[40rem]'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-xl p-2'>Configure Data</h1>
                <div className='flex flex-row space-x-3 mr-3'>
                    <select className="px-4 py-2 h-[40px] bg-white text-black rounded-xl" value={chatbotModel} onChange={handleSelectionBoxChange}>
                        <option value="OpenAI">OpenAI</option>
                        <option value="Hugging Face">Hugging Face</option>
                        <option value="GPT4ALL">GPT4ALL</option>
                    </select>
                    <button onClick={handleSaveData} className='mr-3 text-black border-white mb-2 bg-[#78B4D5] hover:bg-gray-400 transform transition hover:scale-105 hover:text-black hover:font-bold p-2 w-[10rem] rounded-lg'>
                        Set Data
                    </button>
                </div>
            </div>
            <div className='justify-evenly space-x-3 border-b border-gray-600 h-20'>
                <input value={ytURL} onChange={handleYtURL} className='bg-black border border-white p-2 rounded-lg' type="text" placeholder="Enter youtube URL" />
                <input value={webURL} onChange={handleWebURL} className='bg-black border border-white p-2 rounded-lg' type="text" placeholder="Enter web URL" />
                <input onChange={handlePDF} className='bg-black border border-white p-2 rounded-lg w-[10rem]' type="file" placeholder="Upload PDF" />
            </div>
            <div>
                <p className='text-white'>{chatbotResponse}</p>
            </div>
        </div>
    );
}
export default ConfigureData;
