import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 10px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function StyledDropzone(props) {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({accept: 'image/*', onDrop});

    return (
        <div className="container">
            <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Container>
        </div>
    );
}

export default StyledDropzone;