import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import MyRatingComponent from "./MyRatingComponent";

export class RatingControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private rating: number = 0; // Hold the rating value
    private notifyOutputChanged: () => void;

    // Initialize control
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.container = container;
        this.rating = context.parameters.ratingField.raw || 0;

        this.notifyOutputChanged = notifyOutputChanged; // Store the callback

        this.renderControl(context, notifyOutputChanged);

       
    }

    // Update control on data change
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.rating = context.parameters.ratingField.raw || 0;
        this.renderControl(context);
    }

    private renderControl(context: ComponentFramework.Context<IInputs>, notifyOutputChanged?: () => void): void {
        ReactDOM.render(
            React.createElement(MyRatingComponent, {
                value: this.rating,
                onChange: (newValue: number) => {
                    this.rating = newValue;
                    this.notifyOutputChanged(); // Notify Power Apps that value has changed
                }
            }),
            this.container
        );
    }

    // Output the rating to update in Dataverse
    public getOutputs(): IOutputs {
        return { ratingField: this.rating };
    }

    // Cleanup when control is removed
    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container);
    }
}
