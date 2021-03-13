import React from 'react'

export default function TabNav() {
    return (
        <div className="tabs-wrapper">
            <ul className="nav nav-tabs nav-justified" id="myTab">
                {this.props.tabs.map(tab => {
                    const active = (tab === this.props.selected ? ' active' : '');

                    return (
                        <li className="nav-item" key={ tab }>
                            <button className={"nav-link" + active} id="jobSeeker-tab" onClick={ () => this.props.setSelected(tab) }>
                                { tab }
                            </button>
                        </li>
                    );
                })}
            </ul>
                {this.props.children}
            </div>
    )
}
