<?php
/**
 * A2Ec2 class
 *
 * A wrapper class of the Client to interact with Amazon Elastic Compute Cloud
 *
 * @author Antonio Ramirez <amigo.cobos@gmail.com>
 * @copyright Copyright &copy; 2amigos.us 2013-
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 * @package A2.amazon.components
 */
/**
 * Client to interact with Amazon Elastic Compute Cloud
 *
 * @method Model activateLicense(array $args = array()) {@command Ec2 ActivateLicense}
 * @method Model allocateAddress(array $args = array()) {@command Ec2 AllocateAddress}
 * @method Model assignPrivateIpAddresses(array $args = array()) {@command Ec2 AssignPrivateIpAddresses}
 * @method Model associateAddress(array $args = array()) {@command Ec2 AssociateAddress}
 * @method Model associateDhcpOptions(array $args = array()) {@command Ec2 AssociateDhcpOptions}
 * @method Model associateRouteTable(array $args = array()) {@command Ec2 AssociateRouteTable}
 * @method Model attachInternetGateway(array $args = array()) {@command Ec2 AttachInternetGateway}
 * @method Model attachNetworkInterface(array $args = array()) {@command Ec2 AttachNetworkInterface}
 * @method Model attachVolume(array $args = array()) {@command Ec2 AttachVolume}
 * @method Model attachVpnGateway(array $args = array()) {@command Ec2 AttachVpnGateway}
 * @method Model authorizeSecurityGroupEgress(array $args = array()) {@command Ec2 AuthorizeSecurityGroupEgress}
 * @method Model authorizeSecurityGroupIngress(array $args = array()) {@command Ec2 AuthorizeSecurityGroupIngress}
 * @method Model bundleInstance(array $args = array()) {@command Ec2 BundleInstance}
 * @method Model cancelBundleTask(array $args = array()) {@command Ec2 CancelBundleTask}
 * @method Model cancelConversionTask(array $args = array()) {@command Ec2 CancelConversionTask}
 * @method Model cancelExportTask(array $args = array()) {@command Ec2 CancelExportTask}
 * @method Model cancelReservedInstancesListing(array $args = array()) {@command Ec2 CancelReservedInstancesListing}
 * @method Model cancelSpotInstanceRequests(array $args = array()) {@command Ec2 CancelSpotInstanceRequests}
 * @method Model confirmProductInstance(array $args = array()) {@command Ec2 ConfirmProductInstance}
 * @method Model copySnapshot(array $args = array()) {@command Ec2 CopySnapshot}
 * @method Model createCustomerGateway(array $args = array()) {@command Ec2 CreateCustomerGateway}
 * @method Model createDhcpOptions(array $args = array()) {@command Ec2 CreateDhcpOptions}
 * @method Model createImage(array $args = array()) {@command Ec2 CreateImage}
 * @method Model createInstanceExportTask(array $args = array()) {@command Ec2 CreateInstanceExportTask}
 * @method Model createInternetGateway(array $args = array()) {@command Ec2 CreateInternetGateway}
 * @method Model createKeyPair(array $args = array()) {@command Ec2 CreateKeyPair}
 * @method Model createNetworkAcl(array $args = array()) {@command Ec2 CreateNetworkAcl}
 * @method Model createNetworkAclEntry(array $args = array()) {@command Ec2 CreateNetworkAclEntry}
 * @method Model createNetworkInterface(array $args = array()) {@command Ec2 CreateNetworkInterface}
 * @method Model createPlacementGroup(array $args = array()) {@command Ec2 CreatePlacementGroup}
 * @method Model createReservedInstancesListing(array $args = array()) {@command Ec2 CreateReservedInstancesListing}
 * @method Model createRoute(array $args = array()) {@command Ec2 CreateRoute}
 * @method Model createRouteTable(array $args = array()) {@command Ec2 CreateRouteTable}
 * @method Model createSecurityGroup(array $args = array()) {@command Ec2 CreateSecurityGroup}
 * @method Model createSnapshot(array $args = array()) {@command Ec2 CreateSnapshot}
 * @method Model createSpotDatafeedSubscription(array $args = array()) {@command Ec2 CreateSpotDatafeedSubscription}
 * @method Model createSubnet(array $args = array()) {@command Ec2 CreateSubnet}
 * @method Model createTags(array $args = array()) {@command Ec2 CreateTags}
 * @method Model createVolume(array $args = array()) {@command Ec2 CreateVolume}
 * @method Model createVpc(array $args = array()) {@command Ec2 CreateVpc}
 * @method Model createVpnConnection(array $args = array()) {@command Ec2 CreateVpnConnection}
 * @method Model createVpnConnectionRoute(array $args = array()) {@command Ec2 CreateVpnConnectionRoute}
 * @method Model createVpnGateway(array $args = array()) {@command Ec2 CreateVpnGateway}
 * @method Model deactivateLicense(array $args = array()) {@command Ec2 DeactivateLicense}
 * @method Model deleteCustomerGateway(array $args = array()) {@command Ec2 DeleteCustomerGateway}
 * @method Model deleteDhcpOptions(array $args = array()) {@command Ec2 DeleteDhcpOptions}
 * @method Model deleteInternetGateway(array $args = array()) {@command Ec2 DeleteInternetGateway}
 * @method Model deleteKeyPair(array $args = array()) {@command Ec2 DeleteKeyPair}
 * @method Model deleteNetworkAcl(array $args = array()) {@command Ec2 DeleteNetworkAcl}
 * @method Model deleteNetworkAclEntry(array $args = array()) {@command Ec2 DeleteNetworkAclEntry}
 * @method Model deleteNetworkInterface(array $args = array()) {@command Ec2 DeleteNetworkInterface}
 * @method Model deletePlacementGroup(array $args = array()) {@command Ec2 DeletePlacementGroup}
 * @method Model deleteRoute(array $args = array()) {@command Ec2 DeleteRoute}
 * @method Model deleteRouteTable(array $args = array()) {@command Ec2 DeleteRouteTable}
 * @method Model deleteSecurityGroup(array $args = array()) {@command Ec2 DeleteSecurityGroup}
 * @method Model deleteSnapshot(array $args = array()) {@command Ec2 DeleteSnapshot}
 * @method Model deleteSpotDatafeedSubscription(array $args = array()) {@command Ec2 DeleteSpotDatafeedSubscription}
 * @method Model deleteSubnet(array $args = array()) {@command Ec2 DeleteSubnet}
 * @method Model deleteTags(array $args = array()) {@command Ec2 DeleteTags}
 * @method Model deleteVolume(array $args = array()) {@command Ec2 DeleteVolume}
 * @method Model deleteVpc(array $args = array()) {@command Ec2 DeleteVpc}
 * @method Model deleteVpnConnection(array $args = array()) {@command Ec2 DeleteVpnConnection}
 * @method Model deleteVpnConnectionRoute(array $args = array()) {@command Ec2 DeleteVpnConnectionRoute}
 * @method Model deleteVpnGateway(array $args = array()) {@command Ec2 DeleteVpnGateway}
 * @method Model deregisterImage(array $args = array()) {@command Ec2 DeregisterImage}
 * @method Model describeAddresses(array $args = array()) {@command Ec2 DescribeAddresses}
 * @method Model describeAvailabilityZones(array $args = array()) {@command Ec2 DescribeAvailabilityZones}
 * @method Model describeBundleTasks(array $args = array()) {@command Ec2 DescribeBundleTasks}
 * @method Model describeConversionTasks(array $args = array()) {@command Ec2 DescribeConversionTasks}
 * @method Model describeCustomerGateways(array $args = array()) {@command Ec2 DescribeCustomerGateways}
 * @method Model describeDhcpOptions(array $args = array()) {@command Ec2 DescribeDhcpOptions}
 * @method Model describeExportTasks(array $args = array()) {@command Ec2 DescribeExportTasks}
 * @method Model describeImageAttribute(array $args = array()) {@command Ec2 DescribeImageAttribute}
 * @method Model describeImages(array $args = array()) {@command Ec2 DescribeImages}
 * @method Model describeInstanceAttribute(array $args = array()) {@command Ec2 DescribeInstanceAttribute}
 * @method Model describeInstanceStatus(array $args = array()) {@command Ec2 DescribeInstanceStatus}
 * @method Model describeInstances(array $args = array()) {@command Ec2 DescribeInstances}
 * @method Model describeInternetGateways(array $args = array()) {@command Ec2 DescribeInternetGateways}
 * @method Model describeKeyPairs(array $args = array()) {@command Ec2 DescribeKeyPairs}
 * @method Model describeLicenses(array $args = array()) {@command Ec2 DescribeLicenses}
 * @method Model describeNetworkAcls(array $args = array()) {@command Ec2 DescribeNetworkAcls}
 * @method Model describeNetworkInterfaceAttribute(array $args = array()) {@command Ec2 DescribeNetworkInterfaceAttribute}
 * @method Model describeNetworkInterfaces(array $args = array()) {@command Ec2 DescribeNetworkInterfaces}
 * @method Model describePlacementGroups(array $args = array()) {@command Ec2 DescribePlacementGroups}
 * @method Model describeRegions(array $args = array()) {@command Ec2 DescribeRegions}
 * @method Model describeReservedInstances(array $args = array()) {@command Ec2 DescribeReservedInstances}
 * @method Model describeReservedInstancesListings(array $args = array()) {@command Ec2 DescribeReservedInstancesListings}
 * @method Model describeReservedInstancesOfferings(array $args = array()) {@command Ec2 DescribeReservedInstancesOfferings}
 * @method Model describeRouteTables(array $args = array()) {@command Ec2 DescribeRouteTables}
 * @method Model describeSecurityGroups(array $args = array()) {@command Ec2 DescribeSecurityGroups}
 * @method Model describeSnapshotAttribute(array $args = array()) {@command Ec2 DescribeSnapshotAttribute}
 * @method Model describeSnapshots(array $args = array()) {@command Ec2 DescribeSnapshots}
 * @method Model describeSpotDatafeedSubscription(array $args = array()) {@command Ec2 DescribeSpotDatafeedSubscription}
 * @method Model describeSpotInstanceRequests(array $args = array()) {@command Ec2 DescribeSpotInstanceRequests}
 * @method Model describeSpotPriceHistory(array $args = array()) {@command Ec2 DescribeSpotPriceHistory}
 * @method Model describeSubnets(array $args = array()) {@command Ec2 DescribeSubnets}
 * @method Model describeTags(array $args = array()) {@command Ec2 DescribeTags}
 * @method Model describeVolumeAttribute(array $args = array()) {@command Ec2 DescribeVolumeAttribute}
 * @method Model describeVolumeStatus(array $args = array()) {@command Ec2 DescribeVolumeStatus}
 * @method Model describeVolumes(array $args = array()) {@command Ec2 DescribeVolumes}
 * @method Model describeVpcs(array $args = array()) {@command Ec2 DescribeVpcs}
 * @method Model describeVpnConnections(array $args = array()) {@command Ec2 DescribeVpnConnections}
 * @method Model describeVpnGateways(array $args = array()) {@command Ec2 DescribeVpnGateways}
 * @method Model detachInternetGateway(array $args = array()) {@command Ec2 DetachInternetGateway}
 * @method Model detachNetworkInterface(array $args = array()) {@command Ec2 DetachNetworkInterface}
 * @method Model detachVolume(array $args = array()) {@command Ec2 DetachVolume}
 * @method Model detachVpnGateway(array $args = array()) {@command Ec2 DetachVpnGateway}
 * @method Model disableVgwRoutePropagation(array $args = array()) {@command Ec2 DisableVgwRoutePropagation}
 * @method Model disassociateAddress(array $args = array()) {@command Ec2 DisassociateAddress}
 * @method Model disassociateRouteTable(array $args = array()) {@command Ec2 DisassociateRouteTable}
 * @method Model enableVgwRoutePropagation(array $args = array()) {@command Ec2 EnableVgwRoutePropagation}
 * @method Model enableVolumeIO(array $args = array()) {@command Ec2 EnableVolumeIO}
 * @method Model getConsoleOutput(array $args = array()) {@command Ec2 GetConsoleOutput}
 * @method Model getPasswordData(array $args = array()) {@command Ec2 GetPasswordData}
 * @method Model importInstance(array $args = array()) {@command Ec2 ImportInstance}
 * @method Model importKeyPair(array $args = array()) {@command Ec2 ImportKeyPair}
 * @method Model importVolume(array $args = array()) {@command Ec2 ImportVolume}
 * @method Model modifyImageAttribute(array $args = array()) {@command Ec2 ModifyImageAttribute}
 * @method Model modifyInstanceAttribute(array $args = array()) {@command Ec2 ModifyInstanceAttribute}
 * @method Model modifyNetworkInterfaceAttribute(array $args = array()) {@command Ec2 ModifyNetworkInterfaceAttribute}
 * @method Model modifySnapshotAttribute(array $args = array()) {@command Ec2 ModifySnapshotAttribute}
 * @method Model modifyVolumeAttribute(array $args = array()) {@command Ec2 ModifyVolumeAttribute}
 * @method Model monitorInstances(array $args = array()) {@command Ec2 MonitorInstances}
 * @method Model purchaseReservedInstancesOffering(array $args = array()) {@command Ec2 PurchaseReservedInstancesOffering}
 * @method Model rebootInstances(array $args = array()) {@command Ec2 RebootInstances}
 * @method Model registerImage(array $args = array()) {@command Ec2 RegisterImage}
 * @method Model releaseAddress(array $args = array()) {@command Ec2 ReleaseAddress}
 * @method Model replaceNetworkAclAssociation(array $args = array()) {@command Ec2 ReplaceNetworkAclAssociation}
 * @method Model replaceNetworkAclEntry(array $args = array()) {@command Ec2 ReplaceNetworkAclEntry}
 * @method Model replaceRoute(array $args = array()) {@command Ec2 ReplaceRoute}
 * @method Model replaceRouteTableAssociation(array $args = array()) {@command Ec2 ReplaceRouteTableAssociation}
 * @method Model reportInstanceStatus(array $args = array()) {@command Ec2 ReportInstanceStatus}
 * @method Model requestSpotInstances(array $args = array()) {@command Ec2 RequestSpotInstances}
 * @method Model resetImageAttribute(array $args = array()) {@command Ec2 ResetImageAttribute}
 * @method Model resetInstanceAttribute(array $args = array()) {@command Ec2 ResetInstanceAttribute}
 * @method Model resetNetworkInterfaceAttribute(array $args = array()) {@command Ec2 ResetNetworkInterfaceAttribute}
 * @method Model resetSnapshotAttribute(array $args = array()) {@command Ec2 ResetSnapshotAttribute}
 * @method Model revokeSecurityGroupEgress(array $args = array()) {@command Ec2 RevokeSecurityGroupEgress}
 * @method Model revokeSecurityGroupIngress(array $args = array()) {@command Ec2 RevokeSecurityGroupIngress}
 * @method Model runInstances(array $args = array()) {@command Ec2 RunInstances}
 * @method Model startInstances(array $args = array()) {@command Ec2 StartInstances}
 * @method Model stopInstances(array $args = array()) {@command Ec2 StopInstances}
 * @method Model terminateInstances(array $args = array()) {@command Ec2 TerminateInstances}
 * @method Model unassignPrivateIpAddresses(array $args = array()) {@command Ec2 UnassignPrivateIpAddresses}
 * @method Model unmonitorInstances(array $args = array()) {@command Ec2 UnmonitorInstances}
 * @method waitUntilInstanceRunning(array $input) Wait using the InstanceRunning waiter. The input array uses the parameters of the DescribeInstances operation and waiter specific settings
 * @method waitUntilInstanceStopped(array $input) Wait using the InstanceStopped waiter. The input array uses the parameters of the DescribeInstances operation and waiter specific settings
 * @method waitUntilInstanceTerminated(array $input) Wait using the InstanceTerminated waiter. The input array uses the parameters of the DescribeInstances operation and waiter specific settings
 * @method waitUntilExportTaskCompleted(array $input) Wait using the ExportTaskCompleted waiter. The input array uses the parameters of the DescribeExportTasks operation and waiter specific settings
 * @method waitUntilExportTaskCancelled(array $input) Wait using the ExportTaskCancelled waiter. The input array uses the parameters of the DescribeExportTasks operation and waiter specific settings
 * @method waitUntilSnapshotCompleted(array $input) Wait using the SnapshotCompleted waiter. The input array uses the parameters of the DescribeSnapshots operation and waiter specific settings
 * @method waitUntilSubnetAvailable(array $input) Wait using the SubnetAvailable waiter. The input array uses the parameters of the DescribeSubnets operation and waiter specific settings
 * @method waitUntilVolumeAvailable(array $input) Wait using the VolumeAvailable waiter. The input array uses the parameters of the DescribeVolumes operation and waiter specific settings
 * @method waitUntilVolumeInUse(array $input) Wait using the VolumeInUse waiter. The input array uses the parameters of the DescribeVolumes operation and waiter specific settings
 * @method waitUntilVolumeDeleted(array $input) Wait using the VolumeDeleted waiter. The input array uses the parameters of the DescribeVolumes operation and waiter specific settings
 * @method waitUntilVpcAvailable(array $input) Wait using the VpcAvailable waiter. The input array uses the parameters of the DescribeVpcs operation and waiter specific settings
 * @method waitUntilVpnConnectionAvailable(array $input) Wait using the VpnConnectionAvailable waiter. The input array uses the parameters of the DescribeVpnConnections operation and waiter specific settings
 * @method waitUntilVpnConnectionDeleted(array $input) Wait using the VpnConnectionDeleted waiter. The input array uses the parameters of the DescribeVpnConnections operation and waiter specific settings
 * @method waitUntilBundleTaskComplete(array $input) Wait using the BundleTaskComplete waiter. The input array uses the parameters of the DescribeBundleTasks operation and waiter specific settings
 * @method waitUntilConversionTaskCompleted(array $input) Wait using the ConversionTaskCompleted waiter. The input array uses the parameters of the DescribeConversionTasks operation and waiter specific settings
 * @method waitUntilConversionTaskCancelled(array $input) Wait using the ConversionTaskCancelled waiter. The input array uses the parameters of the DescribeConversionTasks operation and waiter specific settings
 * @method waitUntilCustomerGatewayAvailable(array $input) Wait using the CustomerGatewayAvailable waiter. The input array uses the parameters of the DescribeCustomerGateways operation and waiter specific settings
 * @method waitUntilConversionTaskDeleted(array $input) Wait using the ConversionTaskDeleted waiter. The input array uses the parameters of the DescribeCustomerGateways operation and waiter specific settings
 */
class A2Ec2 extends A2Base
{
	/**
	 * @return Aws\CloudFront\CloudFrontClient
	 */
	public function getClient()
	{
		if(null === $this->_client)
		{
			$this->_client = $this->getAws()->get(self::AWS_EC2);
		}
		return $this->_client;
	}
}