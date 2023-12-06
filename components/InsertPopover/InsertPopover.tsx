import React from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
} from "@nextui-org/react";

const InsertPopover = (item : any[] | null, length: number) => {
	const content = (
		<PopoverContent>
			<div className="px-1 py-2">
				<div className="text-small font-bold">Popover Content</div>
				<div className="text-tiny">This is the popover content</div>
			</div>
		</PopoverContent>
	);

	const placement = "left-end";

	if (item) {
        return (
        		<Popover key="left-end" placement="left-end" color="primary">
        			<PopoverTrigger>
        				<Button color="primary" variant="flat" className="capitalize">
        					{placement}
        				</Button>
        			</PopoverTrigger>
        			{content}
        		</Popover>
        	);
    } else {
        return (
            <Popover key="left-end" placement="left-end" color="primary">
                <PopoverTrigger>
                    <Button color="primary" variant="flat" className="capitalize">
                        {placement}
                    </Button>
                </PopoverTrigger>
                {content}
            </Popover>
        );
    }
}

export default InsertPopover