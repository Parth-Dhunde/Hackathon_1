import streamlit as st
from urllib.parse import parse_qs

def main():
    # Get the query parameters
    query_params = st.experimental_get_query_params()
    location = query_params.get('location', [''])[0]

    if location:
        # Pre-fill the location in your form
        st.text_input("Location", value=location)
    
    # Your existing crop prediction code goes here
    # ...

if __name__ == "__main__":
    main()
