// crear pagina con boton de setear una password
// de ahi campia el contenido para poner el email y enviar un send code.
// luego un input para el codigo con boton de verificar
// luego las dos contraseñas para (2)
// sabana larga.

import { Button, Flex, Input, Row, Col, Space } from "antd";
import { JSX, useState } from "react";

const SetPassword: React.FC = () => {

    const [content, setContent] = useState(1)

    // const setPasswordComponent = () => <Button type="primary" onClick={() => handleSetPassword("setPassword") > Set password</ Button>
    // const setPasswordComponent1 = () => <Button type="primary" onClick={() => handleSetPassword("setPassword 1") > Setpassword 1</Button>
    // const setPasswordComponent2 = () => <Button type="primary" onClick={() => handleSetPassword("setPassword") > Set password 2</Button >

    // const handleSetPassword = (key: string) => {
    //     switch (key) {
    //         case "setPassword":
    //             setContent(setPasswordComponent)
    //             break;
    //         case "setPassword 1":
    //             setContent(setPasswordComponent)
    //             break;
    //         case "setPassword 2":
    //             setContent(setPasswordComponent)
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const nextPages = () => {
        setContent(content + 1)
    }

    const previosPages = () => {
        setContent(content - 1)
    }


    return (
        <div style={{ width: '800px', height: '600px', margin: '20px auto', background: "red", display: "Flex", justifyContent: "center", alignItems: "center" }}>

            
                <Button type="primary" onClick={() => previosPages()} style={{ position: "relative", top: "-40%", left:"-10%"}}>Atras</Button>
            

            {content === 1 && (
                <Button type="primary" onClick={() => nextPages()} > Set password </ Button>
            )}

            {content === 2 && (

                <Space direction="vertical" size="large">
                    <p>Escribe tu email para poder enviarte el codigo.</p>
                    <Input placeholder="Email" />
                    <Button type="primary" onClick={() => nextPages()}>Send Code</Button>
                </Space>

            )}

            {content === 3 && (
                <Space direction="vertical" size="large">
                    <p>Escribe el codigo para poder cambiar la contraseña</p>
                    <Input placeholder="Enter your code" maxLength={8} />
                    <Button type="primary" onClick={() => nextPages()}>Validate</Button>
                </Space>
            )}

            {content === 4 && (
                <Space direction="vertical" size="large">
                    <h2>Enter your password</h2>
                    <p>Please enter your password and confirm it to secure your account</p>
                    <div style={{
                        width: '100%',
                        height: '120px',

                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                        flexDirection: "column"
                    }}>
                        <Col xl={12}>
                            <Input.Password placeholder="Password" />
                        </Col>
                        <Col xl={12}>
                            <Input.Password placeholder="Confirm Password" />
                        </Col>
                    </div>



                    <Button type="primary" onClick={() => nextPages()}>Save</Button>
                </Space>
            )}

        </div >
    )
};

export default SetPassword;