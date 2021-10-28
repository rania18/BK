import React from 'react'

export default function ProductInfos(props) {

    const { products } = props;
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
                        <td>{products?.width}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{products?.height}</td>
                    </tr>
                    <tr>
                        <td>Matter</td>
                        <td>{products?.matter}</td>
                    </tr>
                    <tr>
                        <td>Fabrication Delay</td>
                        <td>{products?.delay}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
