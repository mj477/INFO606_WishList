USE [WishList]
GO

-- Drop tables

/*
DROP TABLE [dbo].itemList
DROP TABLE [dbo].[Members]
DROP TABLE [dbo].[Occasions]
GO
*/


CREATE TABLE Members (
    fID			int		IDENTITY(1,1) NOT NULL,
    fName		varchar(20) NOT NULL,
	birthday	varchar(10) NOT NULL,
	hobbies		varchar(100) NOT NULL,
	CONSTRAINT [PK_MEMBERS] PRIMARY KEY CLUSTERED ( fID )
	)

CREATE TABLE Occasions (
    oID			int		IDENTITY(1,1) NOT NULL,
    occasion	varchar(30) NOT NULL,
	CONSTRAINT [PK_OCCASIONS] PRIMARY KEY CLUSTERED ( oID )
	)

CREATE TABLE itemList (
    iID				int		IDENTITY(1,1) NOT NULL,
    itemDescription	varchar(30) NOT NULL,
	fID				int,
	oID				int,
	CONSTRAINT [PK_ITEMLIST] PRIMARY KEY CLUSTERED ( iID ),
	FOREIGN KEY (fID) REFERENCES Members (fID),
	FOREIGN KEY (oID) REFERENCES Occasions (oID)
	)