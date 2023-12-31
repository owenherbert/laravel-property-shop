import React from "react";
import { Property } from "../../networking/api";
import moment from "moment";
import BadgeOutline from "../misc/BadgeOutline";
import Card from "../card/Card";
import CardBody from "../card/CardBody";
import CardActions from "../card/CardActions";
import CardTitle from "../card/CardTitle";
import { toast } from "react-toastify";

interface Props {
    property: Property;
    handler: any;
}

const PropertyCard: React.FC<Props> = (props: Props) => {
    const listedAt = moment(props.property.listed_at);
    const isNew = listedAt.isSame(new Date(), "month");

    const onViewDetailsClicked = () => {
        toast.info("Opening property information!");
        props.handler(props.property);
        window.propertyModal.showModal();
    };

    return (
        <React.Fragment>
            {/* Property Card */}
            <Card>
                <figure>
                    <img
                        src={props.property.image_url}
                        alt="House"
                        className="min-vh-full"
                        height="80px"
                    />
                </figure>
                <CardTitle title={props.property.street_address} />
                <CardBody>
                    <div>
                        Listed <a className="underline">{listedAt.fromNow()}</a>
                        .
                        {isNew && (
                            <div className="badge badge-outline badge-success mx-2">
                                New
                            </div>
                        )}
                    </div>
                    <p>{props.property.description}</p>
                    <CardActions>
                        <BadgeOutline
                            text={props.property.bedroom_count + " Bedrooms"}
                        />
                        <BadgeOutline
                            text={props.property.bathroom_count + " Bathrooms"}
                        />
                        <BadgeOutline
                            text={props.property.car_count + " Car ports"}
                        />
                        <button
                            className="btn btn-primary btn-wide w-full mt-5"
                            onClick={onViewDetailsClicked}
                        >
                            View Details
                        </button>
                    </CardActions>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default PropertyCard;
