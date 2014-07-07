<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@page import="java.util.Enumeration"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%
	Enumeration<String> e = request.getHeaderNames();
	String headername = "";
%>
<!doctype html>
<html>
	<head>
		<title>Test Page</title>
		<meta content="test" name="keywords"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	</head>
	<body>
		<table border=1 width=90% align="center">
			<tr>
				<th>Key</th>
				<th>Value</th>
			</tr>
			<tr>
				<td>User-Agent</td>
				<td></td>
			</tr>
			<tr>
				<td>AuthType</td>
				<td><%=request.getAuthType()%></td>
			</tr>
			<tr>
				<td>ip:</td>
				<td><%=request.getRemoteAddr()%></td>
			</tr>
			<%
				while(e.hasMoreElements()) {
			%>
				<tr>
					<%
						headername = e.nextElement();
					%>
					<td><%=headername%></td>
					<td><%=request.getHeader(headername)%></td>
				</tr>
			<%
				}				
			%>
			<tr>
				<td></td>
				<td></td>
			</tr>
		</table>
	</body>
</html>
