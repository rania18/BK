import React from 'react'

export default function ProductInfos(props) {

    const { product } = props;
    return (
        <div className="product-info">
            <table>
                <thead>
                    <tr>
                        <td>Feature</td>
                        <td>Value</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Width</td>
                        <td>{product.width}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{product.height}</td>
                    </tr>
                    <tr>
                        <td>Matter</td>
                        <td>{product.matter}</td>
                    </tr>
                    <tr>
                        <td>Fabrication Delay</td>
                        <td>{product.delay}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
