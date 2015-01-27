# What is a database?

Data ([from Latin, literally ‘something given,’ neuter past participle of dare ‘give.’](http://www.etymonline.com/index.php?term=data))    
Base ([from Latin basis "foundation," from Greek basis "step, pedestal," from bainein "to step"](http://www.etymonline.com/index.php?term=base))

A database is a persistent, organized collection of data. It is a form of structured memory that can easily become very large. 

## Activities

- Definition of database organization and structure (ontology design)   
The mode of organization -- model and metamodel -- is designed to support desirable modes of accessing and processing information. Models typically reflect aspects of reality, and thus are often termed **ontologies**. (The word ontology originates in philosophy, where it refers to study of the nature of reality, such as the basic categories of existence and their relations.) 

- Updates of actual data, and queries retreiving of sub-sets for application use   
[CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete): Create / Read / Update / Delete, the "four basic functions of persistent storage".   
In SQL: ```INSERT, SELECT, UPDATE, DELETE```
>	- Create & Delete relate to unique existence (identity)
>	- Read & Update relate to input/output (send/receive, read/write), and also privileges.
>	- What is missing from CRUD? Search? List?
>	- Is an annotation an update or a create? What about a link? (i.e. the simplest annotation of 'is related to')

- Administration of the database to ensure its validity (absolute or approximate), accessibility & security, performance, and handling unexpected failures. 

- Visualization of the data, including mashing up multiple queries and data sources; related to infoviz, dataviz, sciviz, infographics, visual analytics, ...

## Models (a brief history)

Early databases used **navigational** models. A navigational database is a type of database in which records or objects are found primarily by following references from other objects. The simplest forms are the linked list and indexable array (and by extension, N-dimensional array). 

In the **hierarchical** model, a record has one parent but potentially many children, i.e. a tree structure. This model is still evident in e.g. file systems and the Document Object Model (DOM) of the web. In the network model a record can have multiple parent and child records, allowing arbitrary graph structures; a contemporary example is the WWW itself. In both cases records have an entity *type*, which defines the record structure. [WikiMindMap example](http://www.wikimindmap.org/viewmap.php?wiki=en.wikipedia.org&topic=data+visualization)

The **relational** model instead uses declarative techniques to ask *what* to fetch rather than *where* to find it. Relational databases store data records as rows in tables, where columns are typed and named fields, including a unique "primary" key column to identify the row. A database may have multiple tables, which can be linked to each other through the keys (the unique key column of one table can appear as a "foreign key" column in another). This allows complex structured queries spanning multiple tables, and returning results as new temporary tabular structures. Most relational databases use the SQL language, and this is currently industry dominant.

> [SQL](http://en.wikipedia.org/wiki/SQL) is a language modelling the relational theory for databases. SQL databases such as Microsoft's, Oracle's, PostgreSQL, MySQL etc. are very widely used in industry. SQL itself is a language to interact with a relational database, including creating, reading, updating and destroying data, through a somewhat natural language. The most frequent statement is SELECT, for performing queries. For example, to return an alphabetized list of sci-fi authors:

	SELECT author FROM book WHERE genre = "scifi" ORDER BY author

**NoSQL** ("Not only SQL") databases store data in a form unlike a tabular relational model, such as key-value stores, graph stores, or document stores. Motivations include simplicity, horizontal scaling and fine access control. NoSQL databases are increasingly used in big data and real-time web applications, where the simplified design offers performance benefits. This is an active area of research!

- Document stores often use XML, JSON or YAML languages. In contrast to relational database rows, they have have complex internal structure that can vary between records; however each document does have a unique key (which may be a URI or path). 
- Key-value stores are based on the associative array data structure of computer science, also known as map, dictionary or symbol type. It is a collection of key-value pairs, in which each key must appear only once. For example, the JavaScript Object type is a key-value collection. 
	- [Entity Attribute Value](http://en.wikipedia.org/wiki/Entity–attribute–value_model) is a data model to describe entities where the number of attributes (properties, parameters) that can be used to describe them is potentially vast, but the number that will actually apply to a given entity is relatively modest. In mathematics, this model is known as a sparse matrix. AKA open schema. 
- Graph databases combines nodes, edges and properties in its ontologies, and records (nodes) have direct links to their adjacent nodes (no index lookups). It is thus a form of navigational database. Edges are the direct links between nodes. Both nodes and edges can have properties (key-value pairs). Graph databases can scale better than relational databases to larger sizes if the edge density is not too high, and better support ad hoc and changing schema. 

## Metadata

Data about data:

- **Structural**: describes the design, specification or layout of the data
- **Descriptive**: describes the content in a condensed manner, useful for sorting, searching etc.

Library card catalogs were a database of metadata about books. Metadata standards describe how to read & write metadata, and are often domain-specific. The Dewey Decimal System is a pre-digital example. 

Digital binary files, such as audio files, movies, images etc., often include a few bytes of metadata at the start (the "header") to describe the binary data that follows, and thus inform software **how to read it**. 

Web pages also have headers (contained in the ```<header>``` tag), which can include ```<meta>``` tags to describe the page content, title, keywords, language, etc. This metadata is mostly designed to aid **search and resource discovery**, whether by human browsing or automated indexing. 

Purposes:

- How, when, where the data was created
- Who it was created by
- What the data is for
- Standards used
- How to read the data
- Relevant relations and contexts for the data 

## Infographics / data visualization

![Charles Joseph Minard's vectorized map (1869) displaying the movements and the number of Napoleonic troops during the Russian campaign (1812-1813), as well as the temperature on the return path.](http://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Minard%27s_Map_%28vectorized%29.svg/1000px-Minard%27s_Map_%28vectorized%29.svg.png)

[Data visualization](http://en.wikipedia.org/wiki/Data_visualization), a modern equivalent of visual communication, involves the creation and study of the visual representation of data. Both an art and a science, data visualization refers to the techniques used to communicate data or information by encoding it as visual objects (e.g., points, lines or bars). A primary goal is to communicate information clearly and efficiently via information graphics, making complex data more accessible and usable, typically to support analysis, reasoning and decision-making.

To convey ideas effectively, both aesthetic form and functionality need to go hand in hand. An ideal visualization should not only communicate clearly, but stimulate viewer engagement and attention.

For Edward Tufte, the *design principle* of the information graphic should support the analytical task.

[Scientific visualization](http://en.wikipedia.org/wiki/Scientific_visualization) is primarily concerned with the visualization of three-dimensional phenomena, to graphically illustrate scientific data to enable scientists to understand, illustrate, and glean insight from their data. [Information visualization](http://en.wikipedia.org/wiki/Information_visualization) is the study of (interactive) visual representations of abstract data to reinforce human cognition. The abstract data include both numerical and non-numerical data, such as text and geographic information. 

### The Ben Fry data visualization process

[Using d3.js](https://www.dashingd3js.com/the-data-visualization-process)

In the first chapter of the Visualizing Data book, Ben Fry sets up the Data Visualization process as a series of steps:

1. Acquire
- Parse
- Filter
- Mine
- Represent
- Refine
- Interact

----

## REST: Representational state transfer

[REST](http://en.wikipedia.org/wiki/Representational_state_transfer) is an architectural style, consisting of constraints imposed on a hypermedia system, which is abstracted from the structure of the World Wide Web (WWW). A system is **RESTful** if it fulfils these constraints:

- Client-server model   
A uniform interface separates clients and servers; e.g. clients are not concerned with data storage, and servers are not concerned with information display. This "separation of concerns" aids portability and scalability.
	- Layered   
A client cannot tell whether it is connected to the server directly or through an intermediary (such as load balancer). 
	- Stateless   
No client context is stored on the server between requests; each request includes all information needed to service it (session context is held in the client). 
	- Cacheable   
Response data can be safely cached and re-used without becoming stale or inappropriate.
- Uniform Interface  
	- Resources (such as entries in a database) can be requested through an identification system, such as URIs in the web, and returned as another representation such as XML, JSON etc.   
	- This representation, and its metadata, are enough to allow the client to issue another request to modify or delete it.   
	- Each message should include enough information to describe how it should be processed (such as what media type it includes, whether it is cacheable, etc.).  
	- Clients make state transitions only through the actions identified by the server response, such as hyperlinks in returned hypertext (HATEOAS; this differentiates it from a service-oriented architecture, in which clients and servers interact through a fixed interface).
