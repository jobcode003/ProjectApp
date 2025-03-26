import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
#from docutils.nodes import sidebar

st.title("Tech gadget consumption Vs E-waste generation")
st.subheader("This is a summary breakdown on how tech gadgets have been adopted globally "
          "from the year 2015 upto 2025")

data=pd.read_csv("C:\\Users\\PC\\Desktop\\python\\Tech_Consumption.csv")
(data.head())

dff=data.groupby("Year")["E-Waste Generated (Metric Tons)"].sum().reset_index()


df1 = data.groupby("Country")[["Smartphone Sales (Millions)","Laptop Shipments (Millions)","E-Waste Generated (Metric Tons)",
                               "5G Penetration Rate (%)","Average Consumer Spending on Gadgets ($)"]].sum().reset_index()
data.dropna(inplace=True)
data.drop_duplicates(inplace = True)

col1, col2 = st.columns(2)

with col1:
    fig,ax = plt.subplots(figsize = (6,4))
    plt.style.use('ggplot')
    ax.bar(df1["Country"],df1["Smartphone Sales (Millions)"],color='g')
    plt.title("Country against smartphone sales",color='black')
    plt.xlabel("country",color='black')
    plt.ylabel("smartphone sales",color='black')
    plt.grid(linestyle="--",color='g')
    plt.xticks(rotation=45,color='black')
    plt.show()
    st.pyplot(fig)
st.write("-> from the Bar plot above it ca be concluded that UK has had the highest sales in smartphones followed by brazil"
             "this indicates that The Uk has had the highest smartphone gadget consumption from 2015-2025")
st.write("-> It is also evident that France has taken the lead in 5G network penetration rate over the years. This highlights"
         "a great milestone in the revolutionising aspect of 5G networks other countries like USA follow behind closely ")
with col2:
    fig2, ax2 = plt.subplots(figsize=(6, 4))
    plt.style.use('ggplot')
    ax2.bar(df1["Country"], df1["5G Penetration Rate (%)"], color='c')
    plt.title("Country against 5G penetration", color="black")
    plt.xlabel("country", color='black')
    plt.ylabel("5G penetration", color='black')
    plt.grid(linestyle="--", color='g')
    plt.xticks(rotation=45, color='b')
    plt.show()
    st.pyplot(fig2)


col3, col4 = st.columns(2)

with col3:
    fig3, ax3 = plt.subplots(figsize=(6, 4))
    plt.style.use('ggplot')
    ax3.bar(df1["Country"], df1["E-Waste Generated (Metric Tons)"], color='b')
    plt.title("Country against E-waste generation", color="black")
    plt.xlabel("country", color='black')
    plt.ylabel("E-waste generation", color='black')
    plt.grid(linestyle="--", color='g')
    plt.xticks(rotation=45, color='g')
    plt.show()
    st.pyplot(fig3)
    st.write("Brazil is taking the lead as the country with the most E-waste generation."
             "his shows that stringent measures need to be taken by the nation to prevent the possible leering"
             "environmental pollution to take place")

with col4:
    fig4, ax4 = plt.subplots(figsize=(6, 4))
    plt.style.use('ggplot')
    import seaborn as sns

    sns.set(style="whitegrid")

    plt.title("change in E-waste generation over years")
    sns.lineplot(data=dff, x='Year', y='E-Waste Generated (Metric Tons)', label='E-waste-trend', color='g')

    plt.show()
    st.pyplot(fig4)
    st.write("The line plot  above shows the amount of E-waste generated with respect to years from 2015-2025")



st.sidebar.write("fill the information ")
st.sidebar.text_input("Enter your name")
st.sidebar.multiselect("which continent do you come from",["Africa","Asia","North America","Antarctica"])
st.sidebar.text_input("Enter your country")

st.sidebar.number_input("Enter your age")
st.sidebar.text_input("what do you think is influencing the high rate of tech growth?")
st.sidebar.selectbox("Gender",["male",["female"]])
if st.sidebar.button("submit"):
    st.success("Thank you for using my application")




