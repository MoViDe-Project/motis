<p align="center"><img src="./static/logo.svg" width="196" height="196"></p>

## How to Use

### 1. Producing a query batch

>MoViDe expects a very specific format for queries, an example is provided in [query-batch.json](./assets/Query-Batch.json).

The query batch holds the journeys that are sent to the MOTIS API for computing a plan between the start and end stops.

A new query batch can be produced by either writing it by hand to target specific stops or by
producing a more general set of requests for larger-scale testing by using the [MoViDe Query Generator](https://github.com/MoViDe-Project/MoViDe-Query-Generator).

### 2. Uploading the query batch and generating reference data

> To use MoViDe two different files need to be provided, first the aforementioned **query batch**, which can be uploaded via the
topmost upload field in the sites' header, and the reference data from a comparison algorithm(_Version A_). This comparison data can be
created by starting MOTIS with the _Version A_ algorithm and computing the queries via MoViDe by pressing the _**Compute Routing**_ button.
This data can be downloaded for later use as reference data via the button labeled _**Download data as reference plan**_.

### 4. Comparing the itineraries
>The reference dataset can be uploaded once MOTIS was restarted with the algorithm that has to be debugged(_Version B_).

When both the queries and the reference data are present, the "Compute Routing" Button can be pressed to again compute the
queries with MOTIS. Now, the routing results of both algorithm versions can be compared to one another.

The computed journeys or itineraries of both algorithms can be seen in the plan overview in the bottom right corner of the screen.

The shown plan is selected at the right by clicking on the queries in the **Query Batch Overview**.

> When comparing two itineraries, the color indicates their status, which can be as follows:

1. **Green:**
   - All attributes of this Itinerary are equal to their counterpart in the reference dataset.
2. **Orange:**
   - A mismatch occurred; at least one attribute is different in the live data vs. the reference dataset.
3. **Red:**
   - Indicates that the itinerary is missing from the other dataset

> In an itinerary, the icon in front of the attribute shows whether it is equal in both itineraries.

> Above the Plan overviews there are filters which when clicked remove the matched/green or mismatched/orange
> itineraries from the plan

> [!CAUTION]
> Even when all attributes of a itinerary are marked with a green checkmark, the itinerary can still hold errors which
> are not displayed here, if this is the case, see [detail view of itineraries](#itinerary-detail-view)

<h4 id="itinerary-detail-view"> 5. Detail view for itinerary comparison </h4>

> For more detail about an itinerary, the button labeled **Open new Itinerary comparison tab** can be pressed.

This button opens a new tab, which shows the currently selected itineraries in much more detail.

The selected itinerary can again be chosen by pressing the **Select** button of the itinerary in the Plan Overview.

The detail view includes the connection detail component of MOTIS with the added icons to see exactly which
attributes are matched or mismatched.