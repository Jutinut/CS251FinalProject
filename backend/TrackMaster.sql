USE [TrackMaster]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](20) NULL,
	[Password] [varchar](100) NULL,
	[Name] [nvarchar](100) NULL,
	[Address] [nvarchar](100) NULL,
	[Phone] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[CustID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[EmID] [varchar](11) NOT NULL,
	[FName] [varchar](50) NULL,
	[LName] [varchar](50) NULL,
	[Salary] [decimal](18, 0) NULL,
	[Phone] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[EmID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NormalEm]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NormalEm](
	[EmID] [varchar](11) NOT NULL,
	[FName] [varchar](50) NULL,
	[LName] [varchar](50) NULL,
	[Salary] [decimal](18, 0) NULL,
	[Phone] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[EmID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Parcel]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Parcel](
	[ParcelID] [int] IDENTITY(1,1) NOT NULL,
	[Phone] [varchar](10) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[City] [nvarchar](100) NOT NULL,
	[Address] [nvarchar](100) NOT NULL,
	[Weight] [real] NOT NULL,
	[Status] [varchar](10) NULL,
	[Deliver] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ParcelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[PaymentID] [varchar](11) NOT NULL,
	[PaymentStatus] [varchar](50) NULL,
	[PaymentDate] [datetime] NULL,
	[Amount] [decimal](18, 0) NULL,
	[PaymentType] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[PaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Receipt]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Receipt](
	[ReceiptID] [varchar](11) NOT NULL,
	[ParcelList] [varchar](255) NULL,
	[IssueDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ReceiptID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shipment_Status]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shipment_Status](
	[TrackingID] [varchar](11) NOT NULL,
	[CurrentStatus] [varchar](30) NULL,
	[CurrentLocation] [nvarchar](50) NULL,
	[Remark] [nvarchar](100) NULL,
	[UpdateDateTime] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[TrackingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SystemEm]    Script Date: 5/16/2025 4:42:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SystemEm](
	[EmID] [varchar](11) NOT NULL,
	[Permission] [varchar](30) NULL,
	[Username] [varchar](20) NULL,
	[Pass] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[EmID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Parcel] ADD  DEFAULT ('waiting') FOR [Status]
GO
