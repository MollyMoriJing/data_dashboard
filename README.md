# Web Development Project 5 - _Pawsome Adoption Hub_

Submitted by: **Jing Du**

This web app: **A dog adoption platform that connects users with adoptable dogs through the [Petfinder API](https://www.petfinder.com/developers/)**

Time spent: **15** hours spent in total

## Required Features

The following **required** functionality is completed:

- [✅] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [✅] **`useEffect` React hook and `async`/`await` are used**
- [✅] **The app dashboard includes at least three summary statistics about the data**
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Most Common Age Group: Displays the most frequent age category among displayed dogs
    - Most Popular Breed: Shows the most common breed in the current dataset
    - Adoption Ready Dogs: Total count of dogs available for adoption
- [✅] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [✅] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [✅] Multiple filters can be applied simultaneously
- [✅] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [✅] The user can enter specific bounds for filter values

The following **additional** features are implemented:

- [ ] responsive design, advanced filtering system with specific bounds, visual enhancement features

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Kap

## Notes

Real-time Filtering Performance

Challenge: Managing multiple simultaneous filters (search, gender, age, size) while maintaining smooth performance
Solution: Optimized filtering logic with efficient array methods and implemented debouncing for search input

State Management Coordination

Challenge: Coordinating multiple state variables (filters, search, pagination, loading states) without causing re-render issues
Solution: Carefully structured React hooks and useEffect dependencies to prevent infinite loops and optimize performance

## License

    Copyright [2025] [Jing Du]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
